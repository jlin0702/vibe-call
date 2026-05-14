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

## Frontend Standards
- **Atomic Design:** Use Shadcn/UI components as the "Atoms." If a UI element is used more than once, it must be promoted to a shared component in src/components/.
- **Zero Raw Divs:** Prohibit the use of raw <div> tags for layout. Use semantic HTML (<main>, <section>, <nav>) or the Layout components defined in DESIGN.md.
- **Tailwind Hygiene:** Use the cn() utility for conditional classes. Avoid "Tailwind Overload" in App.tsx by abstracting complex HUD elements into their own functional components.
- **Zero Inline Styles:** All styling must be handled via Tailwind or the defined Design System tokens.

## Rust Architecture
- **Strict Modularity:** Never allow lib.rs to exceed 200 lines. All logic must be moved into the commands/, models/, or services/ modules.
- **IPC Bridge Pattern:** Use src-tauri/src/commands/ as the Controller layer. Each file in this folder should correspond to a specific feature set (e.g., streaming.rs, auth.rs).
- **State Management:** Use Tauri's Managed State (tauri::State) for global objects like LiveKit Room handles or Database pools, rather than global statics.
- **Error Handling:** Always return Result<T, String> from Tauri commands so the frontend can catch and display errors gracefully.

## Design Consistency
- **Source of Truth:** Always read `DESIGN.md` before generating or refactoring UI code. 
- **Token Usage:** Use CSS variables or Tailwind theme tokens defined in `tailwind.config.ts` rather than hardcoding hex codes.
- **The "Vibe" Check:** All components must follow the "Cyberpunk Tactical HUD" aesthetic (Hexagonal masks, 20px backdrop-blur).

## Quality Assurance
- **Self-Correcting:** If a UI element doesn't match the screenshot context from the Antigravity browser, prioritize fixing the layout before adding new features.
- **Agentic Testing:** When writing new features, generate a corresponding Playwright test script to verify the "Happy Path" (User Login -> Join Room -> Stream).