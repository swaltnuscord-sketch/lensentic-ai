# Lensentic Studio — 2035 Neo-Noir Cinematic OS

**Aesthetic:** Premium AI-native creative operating system | Neo-noir sci-fi with cinematic depth | Futuristic luxury intelligence workspace

## Palette

| Zone | Color | OKLCH | Usage |
|------|-------|-------|-------|
| Navy Deep | #0a0a0f | 0.08 0 0 | Base backgrounds |
| Navy Base | #0d1117 | 0.1 0 0 | Secondary surfaces |
| Electric Blue | #00d4ff | 0.65 0.25 260 | Primary accent, highlights |
| Electric Blue Alt | #3b82f6 | 0.55 0.2 260 | Secondary electric |
| Neon Violet | #8b5cf6 | 0.58 0.22 280 | Secondary accent |
| Neon Violet Bold | #a855f7 | 0.62 0.25 280 | Bold secondary highlights |
| Silver Base | #c0c0c0 | 0.75 0.04 270 | Tertiary text, UI chrome |
| Silver Light | #e2e8f0 | 0.92 0.01 280 | Light typography |
| Charcoal | #1a1a24 | 0.15 0 0 | Card backgrounds, elevated |

## Typography

| Role | Font | Weight | Size | Usage |
|------|------|--------|------|-------|
| Display | Space Grotesk | 700 | 3.5rem–5rem | Hero titles, cinematic headlines |
| Body | General Sans | 400–600 | 0.875rem–1rem | Prose, UI labels |
| Mono | Space Mono | 400–500 | 0.875rem | Code, data, constraints |

## Elevation & Depth

- **Premium Shadow:** Multi-layer navy (0 20px 60px @ 32%, 0 10px 30px @ 18%) for elevated cards
- **Glow Shadow:** Electric blue radiance (30px radius @ 50%, 60px @ 25%) for interactive elements
- **Glow Violet:** Neon violet radiance for secondary highlights
- **Subtle Shadow:** 0 4px 12px @ 8% for delicate UI separations
- **Glassmorphism:** backdrop-blur(12px), border 1px electric-blue @ 20%, semi-transparent navy bg

## Structural Zones

| Zone | Layout | Style | Content |
|------|--------|-------|----------|
| Sidebar | Fixed left, 280px | Frosted glass, vertical nav | Logo, menu, projects, upgrade card, profile |
| Hero | Full-width, centered | Gradient radial navy + announcement pill | Greeting, cinematic headline, tagline |
| Prompt Composer | Centered container, 900px max | Large glassmorphism box | AI prompt field, mode toggles, generate button |
| Generation Modes | Segmented tabs below composer | Premium glassmorphic chips | Fast / Pro / Studio Max tiers |
| Preview Showcase | Full-width grid, 3–4 columns | Card-based with glow borders | Floating AI stills with hover play |
| Project Gallery | Full-width grid, 3–4 columns | Cinematic thumbnails | Recent projects + public templates |

## Motion & Animation

| Animation | Keyframes | Duration | Easing | Purpose |
|-----------|-----------|----------|--------|----------|
| Floating | 0% translateY(0), 50% translateY(-8px), 100% translateY(0) | 3s | ease-in-out ∞ | Floating cards, hero depth |
| Film Grain | 0–50–100% opacity 0.15/0.08, background-shift | 2.5s | ease-in-out ∞ | Texture overlay, cinematic feel |
| Glow Pulse | box-shadow + opacity pulse | 2s | ease-in-out ∞ | Active states, generation pulse |

## Utilities & Effects

- **.glass-morphism:** Backdrop blur 12px, border electric-blue 20%, semi-transparent navy bg
- **.neon-glow:** Layered electric-blue box-shadow, text-shadow glow
- **.gradient-text:** Silver → Electric Blue → Neon Violet cinematic sweep at 135°
- **.floating:** Continuous vertical float animation for cards
- **.film-grain:** Grain texture overlay with opacity shifts

## Spacing & Rhythm

- Base unit: 4px (Tailwind 1–4 scale)
- Cards: 1.5rem internal padding, 1rem external margin
- Hero section: 4rem top/bottom, 2rem horizontal
- Prompt composer: 3rem padding, 2rem radius
- Grid gaps: 1.5rem (card-to-card)

## Constraints & Guardrails

- No Bootstrap defaults: all colors OKLCH-native
- No raw hex or RGB: OKLCH functions only
- No generic AI aesthetics: premium neo-noir cinematic only
- Film grain must be subtle: 0.08–0.15 opacity only
- Glassmorphism borders: always electric-blue or violet, never generic gray
- Gradient text reserved for hero, not overused

## Signature Detail

**Holographic logo orb at sidebar top:** Circular glow with subtle gold radiance, soft rotating animation, serves as visual anchor for premium, intelligence-forward aesthetic.
