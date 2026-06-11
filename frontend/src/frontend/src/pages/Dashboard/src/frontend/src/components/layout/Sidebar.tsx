import { navItems, recentProjectsNav } from "@/data/mockData";
import type { NavItem } from "@/types";
import {
  ChevronRight,
  Clock,
  Coins,
  FolderOpen,
  House,
  LayoutTemplate,
  LifeBuoy,
  LogOut,
  Radio,
  Settings,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  House,
  Clock,
  FolderOpen,
  Star,
  Users,
  LayoutTemplate,
  Radio,
  LifeBuoy,
  Settings,
};

function NavItemButton({
  item,
  index,
  onClick,
}: {
  item: NavItem;
  index: number;
  onClick: (id: string) => void;
  onNavigate?: (id: string) => void;
}) {
  const Icon = iconMap[item.icon] ?? House;
  return (
    <motion.button
      type="button"
      data-ocid={`nav.${item.id}`}
      onClick={() => onClick(item.id)}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ x: 4, backgroundColor: "rgba(59,130,246,0.15)" }}
      className={[
        "relative flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors group",
        item.isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground",
      ].join(" ")}
    >
      {item.isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r bg-primary shadow-[0_0_8px_oklch(var(--primary))]" />
      )}
      <Icon
        size={18}
        className={[
          "shrink-0 transition-colors",
          item.isActive
            ? "text-primary drop-shadow-[0_0_6px_oklch(var(--primary))]"
            : "group-hover:text-foreground",
        ].join(" ")}
      />
      <span
        className={[
          "text-sm font-medium truncate",
          item.isActive ? "text-primary" : "",
        ].join(" ")}
      >
        {item.label}
      </span>
    </motion.button>
  );
}

export function Sidebar({
  onNavigate,
}: {
  onNavigate?: (id: string) => void;
}) {
  const [activeId, setActiveId] = useState("home");
  const [projectsOpen, setProjectsOpen] = useState(true);

  function handleNavClick(id: string) {
    setActiveId(id);
    if (onNavigate) onNavigate(id);
  }

  const navWithActive = navItems.map((item) => ({
    ...item,
    isActive: item.id === activeId,
  }));

  const topNav = navWithActive.slice(0, 5);
  const bottomNav = navWithActive.slice(5);

  return (
    <motion.aside
      data-ocid="sidebar"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-0 h-full z-50 flex flex-col w-60 glass-morphism border-r border-white/5 shadow-[4px_0_30px_oklch(0_0_0/0.4)]"
    >
      {/* Logo orb */}
      <div className="flex items-center justify-center px-3 py-5 shrink-0">
        <div className="relative">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute -inset-1.5 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 60%, rgba(0,212,255,0.6) 100%)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 cursor-pointer relative z-10"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #fbbf24, #f59e0b, #d97706)",
              boxShadow:
                "0 0 20px rgba(251,191,36,0.4), 0 0 40px rgba(251,191,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3)",
              border: "2px solid rgba(0,212,255,0.5)",
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            data-ocid="sidebar.logo"
          >
            <span
              className="text-lg font-display font-bold"
              style={{
                color: "#0d1117",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              L
            </span>
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full animate-glow-pulse z-10 pointer-events-none"
            style={{
              background: "transparent",
              boxShadow: "0 0 12px rgba(0,212,255,0.5)",
            }}
          />
        </div>
        <span className="ml-3 font-display font-semibold text-sm gradient-text whitespace-nowrap overflow-hidden">
          Lensentic
        </span>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 overflow-hidden px-2 space-y-0.5 overflow-y-auto scrollbar-none">
        {topNav.map((item, i) => (
          <NavItemButton
            key={item.id}
            item={item}
            index={i}
            onClick={handleNavClick}
          />
        ))}

        {/* Projects subsection */}
        <div className="mt-1">
          <motion.button
            type="button"
            data-ocid="nav.projects_toggle"
            onClick={() => setProjectsOpen((v) => !v)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth"
          >
            <motion.span
              animate={{ rotate: projectsOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={12} />
            </motion.span>
            <span className="uppercase tracking-wider text-[10px] font-semibold">
              Recent
            </span>
          </motion.button>
          <AnimatePresence>
            {projectsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="ml-5 space-y-0.5 overflow-hidden"
              >
                {recentProjectsNav.map((proj, idx) => (
                  <motion.button
                    key={proj.id}
                    type="button"
                    data-ocid={`nav.recent.${proj.id}`}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.06 + 0.1 }}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-smooth truncate"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: proj.dotColor,
                        boxShadow: `0 0 4px ${proj.dotColor}`,
                      }}
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: idx * 0.3,
                      }}
                    />
                    <span className="truncate">{proj.title}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="my-2 border-t border-white/5" />

        {bottomNav.map((item, i) => (
          <NavItemButton
            key={item.id}
            item={item}
            index={i + topNav.length + 1}
            onClick={handleNavClick}
          />
        ))}
      </nav>

      {/* Upgrade card */}
      <motion.div
        className="mx-2 mb-3 p-3 rounded-xl relative overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.04 285 / 0.8), oklch(0.1 0.02 240 / 0.9))",
          border: "1px solid oklch(0.55 0.2 285 / 0.35)",
        }}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{ boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.06)" }}
        />
        <div className="flex items-start gap-2">
          <Sparkles
            size={14}
            className="text-secondary mt-0.5 shrink-0"
            style={{ filter: "drop-shadow(0 0 4px oklch(0.55 0.2 285))" }}
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground leading-tight">
              Upgrade to Studio Max
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
              Unlock 8K generation
            </p>
          </div>
        </div>
        <motion.button
          type="button"
          data-ocid="sidebar.upgrade_button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 w-full py-1.5 rounded-lg text-[11px] font-semibold text-foreground"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.6 0.22 255), oklch(0.55 0.2 285))",
          }}
        >
          Upgrade Now
        </motion.button>
      </motion.div>

      {/* Footer: user + credits */}
      <motion.div
        className="border-t border-white/5 px-2 py-3 shrink-0"
        data-ocid="sidebar.user_footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <motion.div
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-display font-bold text-xs"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.6 0.22 255), oklch(0.55 0.2 285))",
              boxShadow: "0 0 10px oklch(0.6 0.22 255 / 0.4)",
            }}
            animate={{
              boxShadow: [
                "0 0 10px oklch(0.6 0.22 255 / 0.4)",
                "0 0 20px oklch(0.6 0.22 255 / 0.7)",
                "0 0 10px oklch(0.6 0.22 255 / 0.4)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            D
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              Director
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Coins
                size={10}
                className="text-primary shrink-0"
                style={{ filter: "drop-shadow(0 0 3px oklch(0.6 0.22 255))" }}
              />
              <span className="text-[10px] text-primary font-medium">
                2,450 credits
              </span>
            </div>
          </div>
          <motion.button
            type="button"
            data-ocid="sidebar.logout_button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 rounded hover:bg-foreground/5 transition-smooth text-muted-foreground hover:text-foreground"
            aria-label="Log out"
          >
            <LogOut size={13} />
          </motion.button>
        </div>
      </motion.div>
    </motion.aside>
  );
}

export default Sidebar;
