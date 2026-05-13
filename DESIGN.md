# Vibe Call — Design System

> **Aesthetic:** Cyberpunk Tactical HUD
> **Mood:** Dark, precise, futuristic — a combat overlay for gaming comms.
> **Source CSS:** [`src/index.css`](src/index.css)

---

## 1. Color Palette

### 1.1 Accent — Neon Cobalt

| Token              | Hex / Value          | Usage                                 |
|---------------------|----------------------|---------------------------------------|
| `cobalt`           | `#0066FF`            | Primary accent, active states, CTA    |
| `cobalt-glow`      | `#3399FF`            | Hover glow, text highlights, badges   |
| `cobalt-deep`      | `#0044CC`            | Gradient endpoints, pressed states    |
| `cobalt-dark`      | `#002E80`            | Deep gradient stops                   |
| `cobalt-muted`     | `#1A4D99`            | Disabled / de-emphasized accent       |

### 1.2 Surface — Deep Carbon

| Token              | Hex       | Usage                                         |
|---------------------|-----------|-----------------------------------------------|
| `surface-darkest`  | `#080A0F` | App background, `<body>`                      |
| `surface-dark`     | `#0C0E15` | Panel backgrounds                             |
| `surface-mid`      | `#12151E` | Card / hex-frame fills                        |
| `surface-light`    | `#1A1E2C` | Hover overlays, subtle fills                  |
| `surface-lighter`  | `#232838` | Active list items, elevated surfaces          |

### 1.3 Border

| Token              | Value                            | Usage                       |
|---------------------|----------------------------------|-----------------------------|
| `border-subtle`    | `rgba(0, 102, 255, 0.15)`       | Panel separators, dividers  |
| `border-glow`      | `rgba(0, 102, 255, 0.40)`       | Focus rings, active borders |

### 1.4 Text

| Token              | Hex       | Usage                                  |
|---------------------|-----------|----------------------------------------|
| `text-primary`     | `#F1F5F9` | Headings, usernames, primary copy      |
| `text-secondary`   | `#94A3B8` | Labels, descriptions, inactive icons   |
| `text-muted`       | `#64748B` | Timestamps, metadata, disabled text    |

### 1.5 Status

| Token              | Hex       | Meaning   |
|---------------------|-----------|-----------|
| `status-online`    | `#22C55E` | Online    |
| `status-idle`      | `#F59E0B` | Idle      |
| `status-dnd`       | `#EF4444` | DND / Destructive |
| `status-offline`   | `#6B7280` | Offline   |

### 1.6 Rules

```
ALWAYS use Tailwind tokens: `text-cobalt-glow`, `bg-surface-mid`, etc.
NEVER hardcode hex values like `#0066FF` in component files.
For opacity variants, use Tailwind syntax: `bg-cobalt/15`, `text-text-muted/70`.
```

---

## 2. Typography

### 2.1 Font Stack

| Priority | Font                | Source            | Usage                       |
|----------|---------------------|-------------------|-----------------------------|
| 1        | `Geist Variable`    | `@fontsource`     | shadcn/ui components        |
| 2        | `Inter`             | Google Fonts       | Body text, UI labels        |
| 3        | `system-ui`         | System             | Fallback                    |

### 2.2 Scale

| Element              | Class / Style                               | Weight     |
|----------------------|---------------------------------------------|------------|
| Brand title          | `text-sm font-bold tracking-tight`          | 700        |
| Panel heading        | `text-[15px] font-semibold`                 | 600        |
| Channel name         | `text-sm font-medium`                       | 500        |
| Category label       | `text-[11px] font-semibold tracking-wider uppercase` | 600 |
| Body / metadata      | `text-xs` or `text-[11px]`                  | 400        |
| Badge text           | `text-[9px] font-bold` or `text-[10px]`     | 700        |

### 2.3 Glow Effects

```css
/* Large glow — brand text, headings */
.text-glow       → text-shadow: 0 0 20px rgba(0, 102, 255, 0.5)

/* Small glow — labels, active states */
.text-glow-sm    → text-shadow: 0 0 10px rgba(0, 102, 255, 0.35)
```

---

## 3. Glassmorphism

All panels and containers must use one of the three glass tiers. Raw background colors on layout surfaces are not permitted.

### 3.1 Tiers

| Class          | Blur   | Saturation | Background Opacity | Border Opacity | Use Case                         |
|----------------|--------|------------|--------------------|-----------------|---------------------------------|
| `.glass`       | 28px   | 1.3        | 55%                | 18%             | Sidebars, standard panels        |
| `.glass-light` | 24px   | 1.2        | 45%                | 14%             | Tooltips, badges, overlays       |
| `.glass-heavy` | 48px   | 1.4        | 82%                | 22%             | Top dock, modals, primary shell  |

### 3.2 Spec (for `.glass` — default)

```yaml
background:       rgba(12, 14, 21, 0.55)
backdrop-filter:  blur(28px) saturate(1.3)
border:           1px solid rgba(0, 102, 255, 0.18)
box-shadow:       inset 0 0 20px rgba(0, 102, 255, 0.04)
```

### 3.3 Glow Modifiers

| Class                | Effect                                          | Usage                      |
|----------------------|-------------------------------------------------|----------------------------|
| `.glow-cobalt`       | Subtle outer + inner cobalt glow                | Active panels              |
| `.glow-cobalt-strong`| Intense outer + inner cobalt glow               | Active server icons, CTA   |

---

## 4. Component Specs

### 4.1 `<HexAvatar>`

Hexagonal user/server avatar with optional glowing border.

```yaml
element:     figure (semantic)
location:    src/components/TopDock.tsx  (exported)
clip-path:   polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)
```

| Prop     | Type                           | Default | Description                            |
|----------|--------------------------------|---------|----------------------------------------|
| size     | `"xs" \| "sm" \| "md" \| "lg"` | `"sm"` | Controls width × height                |
| glowing  | `boolean`                      | `false` | Adds scaled gradient hex behind frame  |
| children | `ReactNode`                    |         | Initials, icon, or `<img>`             |

**Size Map:**

| Size | Dimensions    | Use Case                           |
|------|---------------|------------------------------------|
| `xs` | `w-6 h-7`    | Dock icons, voice channel users    |
| `sm` | `w-8 h-9`    | User panel, dock user avatar       |
| `md` | `w-10 h-11`  | Video tile peers                   |
| `lg` | `w-12 h-14`  | Video tile main user (self)        |

**Glow border:** When `glowing=true`, render a second hex behind the main one at `scale-115` with `bg-gradient-to-br from-cobalt/50 to-cobalt-glow/25`.

---

### 4.2 `<Button>` (shadcn)

Use the shadcn `Button` from `@/components/ui/button` for all interactive controls.

```yaml
location:  src/components/ui/button.tsx
source:    shadcn (Radix + Nova preset)
```

**Variants used in this app:**

| Variant       | Token Class                                         | Use Case               |
|---------------|------------------------------------------------------|------------------------|
| `ghost`       | Default ghost style + custom glass overrides         | Mute, Video, Share     |
| `destructive` | `bg-status-dnd hover:bg-red-600 text-white`         | End Call               |

**Control bar button spec:**

```yaml
shape:       rounded-full
size:        w-11 h-11
icon-size:   20px (Lucide)
tooltip:     shadcn <Tooltip> with side="top"
active-off:  glass-light text-text-primary
active-on:   bg-status-dnd/20 text-status-dnd       (mute/video off)
sharing:     bg-cobalt/15 text-cobalt-glow ring-1 ring-cobalt/40 glow-cobalt
```

---

### 4.3 `<Tooltip>` (shadcn)

Use shadcn `Tooltip` for all hover hints. Never use custom tooltip `<span>` elements.

```yaml
location:  src/components/ui/tooltip.tsx
wrapper:   <TooltipProvider> must wrap the app root (in App.tsx)
```

**Usage pattern:**

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon">
      <Mic size={20} />
    </Button>
  </TooltipTrigger>
  <TooltipContent side="top">Mute</TooltipContent>
</Tooltip>
```

---

### 4.4 Layout Containers

Use semantic HTML elements with glass classes. **Never use a raw `<div>` as a layout container.**

| Element     | Role                          | Glass Tier    | Extra                           |
|-------------|-------------------------------|---------------|----------------------------------|
| `<nav>`     | Top dock                      | `glass-heavy` | `h-14`, `z-30`, `shrink-0`      |
| `<aside>`   | Channel sidebar               | `glass`       | `w-60`, `min-w-[240px]`, `z-10` |
| `<main>`    | Video area                    | —             | `flex-1`, `overflow-hidden`      |
| `<header>`  | Channel info bar              | `bg-surface-darkest/40 backdrop-blur-sm` | `h-10`, `z-10` |
| `<section>` | Grouped content areas         | —             | Semantic grouping                |
| `<footer>`  | Control bar (bottom of main)  | `bg-surface-darkest/60 backdrop-blur-sm` | `z-10` |

**App shell structure:**

```
TooltipProvider
└── <div id="app-shell">              ← single structural wrapper (flex-col)
    ├── <nav>     TopDock             ← glass-heavy
    └── <div>     content row         ← flex-row (only structural div)
        ├── <aside>  ChannelSidebar   ← glass
        └── <main>   VideoArea        ← flex-1
            ├── <header> info bar
            ├── <section> video grid
            └── <footer> control bar
```

---

## 5. Animations

### 5.1 Transitions

| Effect              | Duration   | Easing       | Property               |
|---------------------|------------|--------------|------------------------|
| Button hover        | `200ms`    | `ease-out`   | `background`, `color`  |
| Dock item activate  | `250ms`    | `ease-out`   | `all`                  |
| Channel select      | `150ms`    | default      | `all`                  |
| Panel expand        | `300ms`    | `ease-out`   | `all`                  |

### 5.2 Keyframe Animations

| Class                   | Animation        | Duration | Usage                    |
|-------------------------|------------------|----------|--------------------------|
| `.animate-float`        | Organic drift    | 20s      | Background gradient orb  |
| `.animate-float-delayed`| Organic drift    | 25s      | Second orb (offset -10s) |
| `.animate-float-slow`   | Organic drift    | 30s      | Third orb (offset -5s)   |
| `.animate-dock-glow`    | Opacity pulse    | 2s       | Active dock indicator    |
| `.animate-pulse-ring`   | Scale pulse      | 2s       | Speaking indicator       |

---

## 6. Icon System

| Library     | Version     | Default Size | Usage                               |
|-------------|-------------|--------------|--------------------------------------|
| Lucide React| `^1.14.0`   | 16–20px      | All UI icons                         |

**Size conventions:**

| Context                | Size   |
|------------------------|--------|
| Control bar buttons    | `20px` |
| Dock items             | `18px` |
| Channel list icons     | `16px` |
| User panel icons       | `14px` |
| Status indicators      | `12px` |

---

## 7. Spacing & Sizing

| Element               | Value          |
|-----------------------|----------------|
| Top dock height       | `h-14` (56px)  |
| Channel sidebar width | `w-60` (240px) |
| Channel info bar      | `h-10` (40px)  |
| Control bar padding   | `py-3 px-4`    |
| Video tile gap        | `gap-3`        |
| Panel inner padding   | `px-2 py-3` or `px-4` |
| Scrollbar width       | `4px`          |

---

## 8. Agent Parsing Guide

When generating or modifying components, follow this checklist:

```yaml
pre-flight:
  - Read this file (DESIGN.md) first
  - Read AGENTS.md for engineering standards
  - Check existing tokens — never invent new hex codes

element-selection:
  - Layout:    <nav>, <aside>, <main>, <header>, <section>, <footer>
  - Actions:   <Button> from @/components/ui/button
  - Hints:     <Tooltip> from @/components/ui/tooltip
  - Avatars:   <HexAvatar> from @/components/TopDock
  - Grouping:  Only use <div> for flex/grid wrappers with no semantic role

styling:
  - Surface:   Apply glass / glass-light / glass-heavy
  - Borders:   Always via border-subtle or border-glow tokens
  - Glow:      glow-cobalt or glow-cobalt-strong classes
  - Text:      text-primary / text-secondary / text-muted
  - Accent:    cobalt / cobalt-glow / cobalt-deep
  - Conditionals: Use cn() from @/lib/utils

avatar-rendering:
  - Shape:     Always hexagonal via <HexAvatar> or .hex-frame
  - Never:     Use rounded-full for user/server avatars
  - Exception: Status dots remain circular (rounded-full)

animations:
  - Hover:     transition-all duration-200 ease-out
  - Orbs:      animate-float / animate-float-delayed / animate-float-slow
  - Active:    animate-dock-glow for dock indicators
```
