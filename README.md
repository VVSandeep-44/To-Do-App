# Modern Todo App

A clean, responsive Todo application built with HTML, Tailwind CSS (CDN), Font Awesome, and vanilla JavaScript. Tasks are saved in the browser using localStorage, so your list persists between sessions.

## Features
- Add tasks: Quick input with validation.
- Complete tasks: Toggle via checkbox with visual state.
- Filters: View All, Active, or Completed tasks.
- Counters: Total tasks and completed count.
- Clear completed: One click to remove finished tasks.
- Persistence: Stores tasks in `localStorage` (per browser/device).
- Modern UI: Tailwind styles, subtle animations, and icons.

## Tech Stack
- HTML + Tailwind CSS (via CDN)
- Font Awesome (icons via CDN)
- Vanilla JavaScript (`localStorage` for data)

## Project Structure
```
.
├─ index.html
├─ css/
│  └─ style.css
└─ js/
   └─ script.js
```
- App entry: [index.html](index.html)
- Styles: [css/style.css](css/style.css)
- Logic: [js/script.js](js/script.js)

## Quick Start
You can open `index.html` directly in a browser, but using a local server is recommended.

### Option 1: VS Code Live Server
- Install the "Live Server" extension.
- Open the project folder in VS Code.
- Right‑click `index.html` → "Open with Live Server".
- If present, the workspace setting uses port 5501 (see [.vscode/settings.json](.vscode/settings.json)). Otherwise Live Server uses 5500 or the next free port.

### Option 2: Python (Windows)
From the project root:
```powershell
py -m http.server 5501
```
Then open http://localhost:5501/ in your browser.

### Option 3: Node (optional)
If you have Node.js installed:
```bash
npx serve -l 5501 .
```

## Usage
- Add a task: Type into the input and press Enter or click "Add".
- Mark complete: Toggle the checkbox next to a task.
- Filter: Use the All / Active / Completed buttons.
- Clear completed: Click "Clear completed" in the footer.
- Data storage: Tasks are saved to `localStorage` automatically.

## Customization
- Styling: Tweak Tailwind utility classes in [index.html](index.html) or add custom rules in [css/style.css](css/style.css).
- Icons: Adjust or remove Font Awesome icons as needed.
- Behavior: Extend features in [js/script.js](js/script.js) (e.g., due dates, editing, reorder).

## Troubleshooting
- Live Server port in use: Change the port in VS Code settings or adjust [.vscode/settings.json](.vscode/settings.json).
- CDN access required: Tailwind and Font Awesome are loaded from CDNs; ensure you have internet access when running.
- LocalStorage: Data is per browser and per domain (or file origin). Clearing site data will remove tasks.

## License
Add your preferred license here (e.g., MIT).
