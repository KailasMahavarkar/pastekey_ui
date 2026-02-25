## 2024-05-25 - [Huge CodeMirror Bundle Size]
**Learning:** The `@uiw/react-codemirror` and associated extensions are extremely heavy (hundreds of kBs). Including them in the main bundle severely impacts initial load time.
**Action:** Always lazy load CodeMirror components using `next/dynamic` with `ssr: false`, and use a loading skeleton to prevent layout shift. This reduced the initial JS bundle by ~73%.
