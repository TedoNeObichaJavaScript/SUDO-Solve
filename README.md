<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=40&duration=3000&pause=1000&color=00FF41&center=true&vCenter=true&repeat=true&width=600&height=80&lines=%24+sudo+solve;%3E+Access+Granted+%E2%9C%93;%3E+Level+Up+%F0%9F%9A%80" alt="sudo solve animation" />
</p>

<p align="center">
  <strong>Learn to code, one command at a time.</strong>
</p>

<p align="center">
  <a href="#-features"><img src="https://img.shields.io/badge/levels-30-00ff41?style=for-the-badge&labelColor=0d1117" alt="30 Levels"></a>
  <a href="#-categories"><img src="https://img.shields.io/badge/categories-7-00ff41?style=for-the-badge&labelColor=0d1117" alt="7 Categories"></a>
  <a href="#-getting-started"><img src="https://img.shields.io/badge/framework-none-00ff41?style=for-the-badge&labelColor=0d1117" alt="No Framework"></a>
  <img src="https://img.shields.io/badge/license-MIT-00ff41?style=for-the-badge&labelColor=0d1117" alt="MIT License">
</p>

<br>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=14&duration=2000&pause=500&color=00FF41&center=true&vCenter=true&repeat=true&width=500&lines=%24+console.log(%22Hello%2C+World!%22);+%E2%9C%93+PASSED;%24+let+hero+%3D+%22Ada%22;+%E2%9C%93+PASSED;%24+for+(let+i%3D1;+i%3C%3D5;+i%2B%2B)+%7B...%7D;+%E2%9C%93+PASSED;%24+git+init;+%E2%9C%93+Repository+initialized" alt="gameplay demo" />
</p>

---

## What is sudo solve?

**sudo solve** is an interactive browser-based coding game that teaches programming through a terminal interface. Type real code, get instant feedback, and progress through 30 levels covering JavaScript fundamentals and Git basics.

No accounts. No installs. No setup. Just open and start typing.

```
 ╔══════════════════════════════════════════════════════╗
 ║  user@sudoquest:~$                                  ║
 ║                                                     ║
 ║  Level 1: Hello, World!                             ║
 ║  Use console.log() to print "Hello, World!"         ║
 ║                                                     ║
 ║  $ console.log("Hello, World!")                     ║
 ║                                                     ║
 ║  ✓ PASSED — You just printed your first message!    ║
 ║                                                     ║
 ╚══════════════════════════════════════════════════════╝
```

---

## Features

- **Real Code Execution** — JavaScript runs in a sandboxed Web Worker. No simulation, no faking it
- **Git Simulation** — Levels 28-30 simulate a real Git environment with init, commit, and branching
- **3-Tier Hint System** — Stuck? Reveal hints progressively — from concept to syntax to full answer
- **Progress Persistence** — Your progress saves to `localStorage`. Close the tab, come back later
- **Terminal UI** — Authentic dark terminal aesthetic with JetBrains Mono, green-on-black, and a blinking cursor
- **Keyboard-First** — Type commands and press Enter. Arrow keys for command history. `Ctrl+L` to clear
- **Zero Dependencies** — Pure HTML, CSS, and vanilla JavaScript on the frontend. Just Express for serving

---

## Categories

| # | Category | Levels | What You'll Learn |
|---|----------|--------|-------------------|
| 1 | **Basics** | 1–5 | `console.log`, variables, numbers, math, string concatenation |
| 2 | **Conditions** | 6–9 | `if/else`, strict equality `===`, logical operators `&&` |
| 3 | **Loops** | 10–13 | `for`, `while`, countdown, `for...of` |
| 4 | **Arrays** | 14–17 | Create, access, `.push()`, `.length` |
| 5 | **Objects** | 18–20 | Create, dot notation, nested objects |
| 6 | **Functions** | 21–24 | Declaration, `return`, arrow functions, callbacks |
| 7 | **Advanced** | 25–27 | `.map()`, `.filter()`, ternary operator |
| 8 | **Git** | 28–30 | `git init`, staging & committing, branching |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/TedoNeObichaJavaScript/SUDO-Solve.git
cd SUDO-Solve

# Install dependencies
npm install

# Start the server
npm start
```

Open [http://localhost:3000](http://localhost:3000) and start solving.

### Development

```bash
npm run dev
```

---

## Project Structure

```
sudo-solve/
├── public/
│   ├── index.html              # Single page app shell
│   ├── css/
│   │   └── styles.css          # Terminal theme (pure CSS)
│   ├── js/
│   │   ├── app.js              # Game engine (SudoQuest class)
│   │   └── levels.js           # 30 level definitions + validators
│   └── workers/
│       └── sandbox-worker.js   # Web Worker for safe code execution
├── server/
│   └── index.js                # Express static server
├── package.json
└── LICENSE
```

---

## How It Works

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  User types  │────▶│  Game Engine  │────▶│  Sandbox Worker │
│  code in     │     │  (app.js)    │     │  (Web Worker)   │
│  terminal    │     │              │     │                 │
│              │◀────│  Validates   │◀────│  Executes code  │
│  Gets result │     │  output      │     │  safely         │
└─────────────┘     └──────────────┘     └─────────────────┘
```

1. **User input** is captured from the terminal-styled input field
2. **JavaScript levels** send code to a Web Worker sandbox that executes it safely and returns variables, console output, and errors
3. **Git levels** process commands through a simulated Git state machine
4. **Validation functions** (defined per-level) check if the output matches expected results
5. **Progress** is saved to `localStorage` after each completed level

---

## Commands

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `hint` | Reveal the next hint (3 per level) |
| `skip` | Skip to the next level |
| `reset` | Restart the current level |
| `levels` | View all levels and progress |
| `clear` | Clear the terminal screen |
| `Ctrl+L` | Clear terminal (keyboard shortcut) |
| `↑` / `↓` | Navigate command history |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla JS, CSS, HTML |
| Font | JetBrains Mono |
| Code Execution | Web Workers (sandboxed) |
| Server | Express.js |
| Storage | localStorage |

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=16&duration=4000&pause=2000&color=00FF41&center=true&vCenter=true&repeat=true&width=400&height=30&lines=%24+sudo+solve+--all;Happy+hacking!+%F0%9F%92%BB" alt="footer" />
</p>
