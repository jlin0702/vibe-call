# AI Development Team

## Personas
- **Architect (Lead):** Responsible for Tauri + Rust safety and high-level project structure. 
- **Frontend Engineer:** Expert in React, Tailwind, and LiveKit Web SDK. Focuses on 60fps UI performance.
- **Systems Engineer:** Expert in Rust and Windows/macOS native APIs for 1080p screen capture.
- **Privacy Officer:** Ensures End-to-End Encryption (E2EE) is implemented correctly and no data leaks to Cloud logs.

## Global Constraints
- **Performance:** App must use < 150MB RAM during 1080p gaming sessions.
- **Privacy:** Use LiveKit E2EE. Encryption keys stay local to the client.
- **Stack:** Tauri v2, React (Vite), TypeScript, Rust, Supabase/Firebase.

## Engineering Standards
- **Component-First Architecture:** Never use raw `<div>` or `<button>` tags for UI elements. Use atoms from `@/components/ui` (Shadcn) exclusively.
- **Semantic Layouts:** Use `<header>`, `<main>`, `<section>`, and `<nav>` to define the layout structure. 
- **Tailwind Hygiene:** Avoid long strings of utility classes in `App.tsx`. Abstract complex styling into Tailwind variants within the component files or use the `cn()` utility for conditional classes.
- **Zero Inline Styles:** All styling must be handled via Tailwind or the defined Design System tokens.

## Design Consistency
- **Source of Truth:** Always read `DESIGN.md` before generating or refactoring UI code. 
- **Token Usage:** Use CSS variables or Tailwind theme tokens defined in `tailwind.config.ts` rather than hardcoding hex codes.
- **The "Vibe" Check:** All components must follow the "Cyberpunk Tactical HUD" aesthetic (Hexagonal masks, 20px backdrop-blur).

## Quality Assurance
- **Self-Correcting:** If a UI element doesn't match the screenshot context from the Antigravity browser, prioritize fixing the layout before adding new features.
- **Agentic Testing:** When writing new features, generate a corresponding Playwright test script to verify the "Happy Path" (User Login -> Join Room -> Stream).