

## Goal
Improve EchoCare's visual hierarchy and color contrast across mobile and desktop. Make better use of empty space, deepen the background and surfaces (no off-white), and re-balance layouts so each viewport feels intentional rather than scaled.

## 1. Color theme — deeper, higher-contrast palette

Update `src/index.css` light theme tokens:
- `--background`: deeper soft slate-teal (e.g. `200 30% 92%`) instead of near-white `195 20% 98%`
- `--card`: crisp white `0 0% 100%` retained, but elevate with stronger shadow so cards "pop" against the deeper background
- `--foreground`: darker for body text (e.g. `210 35% 15%`)
- `--muted-foreground`: bumped from `210 15% 50%` → `210 20% 38%` for AA contrast on the new background
- `--primary`: deepen teal (`187 90% 35%`) for stronger contrast on white cards and as button fill
- `--secondary`: deepen green (`145 65% 38%`)
- `--alert`: richer coral (`12 85% 55%`)
- `--accent`: shift to `195 35% 86%` so accent panels read as a clear tinted surface, not "off-white"
- `--border`: `200 25% 78%` (more visible card edges)
- Strengthen `--shadow-card` to `0 6px 20px -6px hsl(200 50% 25% / 0.18)`
- Add a new `--gradient-hero` (teal → deep teal) for header bands

Dark theme: minor parallel deepening, unchanged structure.

## 2. Mobile layout — focused, vertical, breathable

Use the rediscovered vertical space instead of shrinking everything.

**Bottom nav (`MobileNavigation.tsx`)**: raise to `h-18`, add safe-area padding, active item gets a pill background (`bg-primary/15`) under the icon for clearer feedback.

**Dashboard mobile**:
- Compact sticky top bar: small logo + title left, single bell button right (Settings/User move into bottom nav's Settings tab)
- Hero card: full-width gradient card showing patient name, "All systems operational" pill, and large time/date — fills the previously sparse banner area
- Emergency button: kept full-width XL, but now sits inside its own padded section with subtle alert glow
- Status cards: switch from cramped 1-column to a **2-column grid for the two key vitals** (Heart Rate, SpO₂) with a third full-width "Active Monitors" card below — better space use than three stacked cards
- Recent Activity: bigger touch targets, severity dot becomes a colored left-border stripe
- Remove the desktop "Quick Actions" card on mobile (those actions live in the bottom nav)

**Vitals mobile**: add back-arrow only on desktop (mobile uses bottom nav), stack charts with more vertical breathing room, collapse "Connected" badge into the header row.

**Emergency Alert mobile**: 
- Remove pulsing border (too noisy on small screens) — keep the alert background tint
- Stack action buttons in a 2×2 grid: row 1 = `Call 911` + `Acknowledge` (priority), row 2 = `Dismiss` + `View Camera`
- Vitals + timeline as horizontal scrollable chips above the map

**House Map mobile**: stat cards become a single horizontal scroll row to free vertical space for the map itself.

## 3. Desktop layout — use the empty real estate

**Dashboard desktop**:
- Introduce a max content width (`max-w-7xl mx-auto`) so content doesn't drift edge-to-edge on ultra-wide screens
- Replace the 3-column status row with a **hero left column (2/3)** containing: greeting + emergency button + status cards, and a **right column (1/3)** with a live "House at a glance" mini-map preview + Quick Actions
- Recent Activity becomes a full-width section below with timeline-style entries instead of compact rows

**Vitals desktop**: 2-column chart grid (instead of 3 stacked full-width charts), Thresholds + Devices side-by-side below.

**Emergency Alert desktop**: keep 3-column grid but widen the map column, add a sticky action bar at the top of the map column.

**House Map desktop**: move device stats into a left sidebar column alongside the map (instead of a top strip), making the map feel like the focal point.

## 4. Component polish

- `StatusCard`: stronger icon chip background (`bg-primary/10` for normal variant, not `bg-background`), larger value text on desktop (`text-4xl md:text-5xl`)
- Cards globally: add subtle 1px inner highlight via `ring-1 ring-white/40` so they lift off the deeper background
- Buttons: `emergency` variant gets a brighter ring on hover for accessibility

## Files to modify
- `src/index.css` — color tokens, gradients, shadows
- `src/components/StatusCard.tsx` — sizing & icon chip contrast
- `src/components/MobileNavigation.tsx` — taller bar, active pill
- `src/pages/Dashboard.tsx` — new mobile + desktop layouts
- `src/pages/Vitals.tsx` — desktop 2-col charts, mobile spacing
- `src/pages/EmergencyAlert.tsx` — mobile button grid, calmer alert card
- `src/pages/HouseMapPage.tsx` — desktop sidebar, mobile horizontal stats

No new dependencies, no routing changes, no backend.

