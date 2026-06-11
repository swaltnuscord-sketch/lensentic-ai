#!/usr/bin/env python3
"""
Folder Size Calculator
Calculates the size of folders with human-readable output and sorting options.
"""

import os
import sys
import argparse
from pathlib import Path


def get_size(path: Path) -> int:
    """Recursively calculate total size of a directory in bytes."""
    total = 0
    try:
        for entry in os.scandir(path):
            try:
                if entry.is_symlink():
                    continue  # skip symlinks to avoid loops
                if entry.is_file():
                    total += entry.stat().st_size
                elif entry.is_dir():
                    total += get_size(Path(entry.path))
            except (PermissionError, OSError):
                pass  # skip files/folders we can't access
    except (PermissionError, OSError) as e:
        print(f"  [Warning] Cannot access '{path}': {e}", file=sys.stderr)
    return total


def human_readable(size_bytes: int) -> str:
    """Convert bytes to a human-readable string."""
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if size_bytes < 1024:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.2f} PB"


def calculate_folder_sizes(
    target: Path,
    depth: int = 1,
    sort_by: str = "size",
    reverse: bool = True,
    show_files: bool = False,
) -> list[tuple[Path, int]]:
    """
    Walk `target` up to `depth` levels and return (path, size) pairs.
    depth=0  → only the target itself
    depth=1  → immediate children (default)
    depth=-1 → unlimited
    """
    results: list[tuple[Path, int]] = []

    def walk(path: Path, current_depth: int):
        if not path.is_dir():
            if show_files and path.is_file():
                results.append((path, path.stat().st_size))
            return
        try:
            entries = list(os.scandir(path))
        except (PermissionError, OSError):
            return

        for entry in entries:
            entry_path = Path(entry.path)
            if entry.is_symlink():
                continue
            if entry.is_dir():
                size = get_size(entry_path)
                results.append((entry_path, size))
                if depth == -1 or current_depth < depth:
                    walk(entry_path, current_depth + 1)
            elif show_files and entry.is_file():
                results.append((entry_path, entry.stat().st_size))

    if depth == 0:
        # Just report the target itself
        size = get_size(target) if target.is_dir() else target.stat().st_size
        results.append((target, size))
    else:
        walk(target, 1)

    # Sort
    key = (lambda x: x[1]) if sort_by == "size" else (lambda x: x[0].name.lower())
    results.sort(key=key, reverse=reverse)
    return results


def print_results(
    results: list[tuple[Path, int]],
    base: Path,
    show_absolute: bool = False,
    bar_width: int = 20,
) -> None:
    """Print results as a formatted table with an optional bar chart."""
    if not results:
        print("No entries found.")
        return

    max_size = max(size for _, size in results) or 1
    label_width = max(len(str(p if show_absolute else p.relative_to(base.parent))) for p, _ in results)
    label_width = min(label_width, 60)  # cap at 60 chars

    header = f"{'Path':<{label_width}}  {'Size':>10}  {'Bar':^{bar_width}}"
    print("\n" + header)
    print("-" * len(header))

    for path, size in results:
        label = str(path if show_absolute else path.relative_to(base.parent))
        if len(label) > label_width:
            label = "…" + label[-(label_width - 1):]
        filled = int(bar_width * size / max_size)
        bar = "█" * filled + "░" * (bar_width - filled)
        print(f"{label:<{label_width}}  {human_readable(size):>10}  {bar}")

    total = sum(size for _, size in results)
    print("-" * len(header))
    print(f"{'TOTAL':<{label_width}}  {human_readable(total):>10}")
    print()


def main():
    parser = argparse.ArgumentParser(
        description="Calculate and display folder sizes.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python folder_size.py .                    # size of immediate subdirs
  python folder_size.py /home/user -d 2      # two levels deep
  python folder_size.py /var/log -d -1       # unlimited depth
  python folder_size.py . --sort name        # sort alphabetically
  python folder_size.py . --files            # include files too
  python folder_size.py . --asc              # smallest first
""",
    )
    parser.add_argument("path", nargs="?", default=".", help="Target directory (default: current directory)")
    parser.add_argument("-d", "--depth", type=int, default=1,
                        help="Depth of traversal; -1 for unlimited (default: 1)")
    parser.add_argument("--sort", choices=["size", "name"], default="size",
                        help="Sort results by size or name (default: size)")
    parser.add_argument("--asc", action="store_true",
                        help="Sort ascending (default: descending)")
    parser.add_argument("--files", action="store_true",
                        help="Include files alongside directories")
    parser.add_argument("--absolute", action="store_true",
                        help="Show absolute paths instead of relative")
    parser.add_argument("--no-bar", action="store_true",
                        help="Suppress the bar chart column")

    args = parser.parse_args()
    target = Path(args.path).resolve()

    if not target.exists():
        print(f"Error: '{target}' does not exist.", file=sys.stderr)
        sys.exit(1)

    print(f"Scanning: {target}")

    results = calculate_folder_sizes(
        target,
        depth=args.depth,
        sort_by=args.sort,
        reverse=not args.asc,
        show_files=args.files,
    )

    bar_width = 0 if args.no_bar else 20
    print_results(results, target, show_absolute=args.absolute, bar_width=bar_width)


if __name__ == "__main__":
    main()