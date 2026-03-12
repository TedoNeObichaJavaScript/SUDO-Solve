<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=40&duration=3000&pause=1000&color=00FF41&center=true&vCenter=true&repeat=true&width=600&height=80&lines=%24+sudo+quest;%3E+Access+Granted+%E2%9C%93;%3E+Level+Up+%F0%9F%9A%80" alt="Sudo Quest animation" />
</p>

<p align="center">
  <strong>Learn to code, one command at a time.</strong>
</p>

<p align="center">
  <a href="#-features"><img src="https://img.shields.io/badge/levels-490-00ff41?style=for-the-badge&labelColor=0d1117" alt="490 Levels"></a>
  <a href="#-categories"><img src="https://img.shields.io/badge/categories-14-00ff41?style=for-the-badge&labelColor=0d1117" alt="14 Categories"></a>
  <a href="#-getting-started"><img src="https://img.shields.io/badge/framework-none-00ff41?style=for-the-badge&labelColor=0d1117" alt="No Framework"></a>
  <img src="https://img.shields.io/badge/license-MIT-00ff41?style=for-the-badge&labelColor=0d1117" alt="MIT License">
</p>

<br>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=14&duration=2000&pause=500&color=00FF41&center=true&vCenter=true&repeat=true&width=500&lines=%24+console.log(%22Hello%2C+World!%22);+%E2%9C%93+PASSED;%24+let+hero+%3D+%22Ada%22;+%E2%9C%93+PASSED;%24+for+(let+i%3D1;+i%3C%3D5;+i%2B%2B)+%7B...%7D;+%E2%9C%93+PASSED;%24+git+init;+%E2%9C%93+Repository+initialized" alt="gameplay demo" />
</p>

---

## What is Sudo Quest?

**Sudo Quest** is an interactive browser-based coding game that teaches programming through a terminal interface. Type real code, get instant feedback, and progress through **490 levels** covering 14 languages and tools — from JavaScript and Python to Git, SQL, and Rust.

No accounts. No installs. No setup. Just open and start typing.

```
 +======================================================+
 |  user@sudoquest:~$                                   |
 |                                                      |
 |  Level 1: Hello, World!                              |
 |  Use console.log() to print "Hello, World!"          |
 |                                                      |
 |  $ console.log("Hello, World!")                      |
 |                                                      |
 |  > PASSED -- You just printed your first message!    |
 |                                                      |
 +======================================================+
```

---

## Features

- **Real Code Execution** — JavaScript runs in a sandboxed Web Worker. No simulation, no faking it
- **Git & Terminal Simulation** — Simulated environments with persistent state for Git and shell commands
- **14 Categories** — JavaScript, Python, TypeScript, C, C++, Java, C#, Rust, HTML, CSS, React, SQL, Git, and Terminal — 35 levels each
- **490 Levels** — Progressive difficulty from beginner to advanced across every category
- **Scoring System** — 100 pts per level, -25 per hint. Track your score across all categories
- **19 Achievements** — Category mastery badges, speed runs, no-hint clears, streaks, and more
- **Daily Challenges** — A new challenge every day, pulled from the full level pool
- **Spaced Review** — Struggling levels are auto-scheduled for review at increasing intervals
- **Streak Tracking** — Daily login streaks with a visual 28-day calendar
- **Stats Dashboard** — Per-category progress bars, accuracy %, score breakdowns, and weak area analysis
- **Learning Sandbox** — 53 interactive concepts across all 14 categories with executable examples
- **Playground** — Free-form JavaScript REPL with no scoring pressure
- **Mini-Projects** — Multi-level projects that group related levels into guided challenges
- **3-Tier Hint System** — Stuck? Reveal hints progressively — from concept to syntax to full answer
- **Session Timer** — Track your total time and per-level splits as you play
- **8 Themes** — Green, amber, cyan, purple, red, pink, blue, and white
- **Sound Effects** — Programmatic audio via Web Audio API (level complete chimes, achievement sparkles, error buzzes)
- **Progress Persistence** — Everything saves to `localStorage`. Close the tab, come back later
- **Save/Load** — Export your progress as a base64 string or import it on another device
- **Terminal UI** — Authentic dark terminal aesthetic with system monospace fonts and a blinking cursor
- **Keyboard-First** — Type commands and press Enter. Shift+Enter for multi-line. Tab to autocomplete. Arrow keys for history
- **Mobile Support** — Responsive layout with a slide-up drawer menu on small screens
- **Zero Dependencies** — Pure HTML, CSS, and vanilla JS on the frontend. Just Express for serving

---

## Categories

| # | Category | Levels | What You'll Learn |
|---|----------|--------|-------------------|
| 1 | **JavaScript** | 35 | Variables, types, control flow, loops, arrays, objects, functions, arrow functions, destructuring, spread, classes, closures |
| 2 | **Git** | 35 | init, add, commit, status, log, branching, checkout, switch, stash, merge, feature branch workflows |
| 3 | **Terminal** | 35 | pwd, ls, cd, mkdir, touch, echo, cat, cp, mv, rm, pipes, grep, sort, head, tail, environment variables |
| 4 | **HTML** | 35 | Boilerplate, headings, links, images, lists, forms, inputs, tables, semantic elements, meta tags, data attributes |
| 5 | **CSS** | 35 | Selectors, box model, flexbox, grid, positioning, transitions, hover states, media queries, CSS variables, pseudo-elements |
| 6 | **C#** | 35 | Types, variables, control flow, arrays, lists, methods, classes, inheritance, interfaces, LINQ, async/await, enums |
| 7 | **Python** | 35 | Variables, strings, lists, dicts, loops, functions, classes, comprehensions, file I/O, error handling |
| 8 | **C** | 35 | Data types, pointers, arrays, strings, structs, memory allocation, file I/O, preprocessor directives |
| 9 | **C++** | 35 | Classes, templates, STL containers, iterators, smart pointers, inheritance, polymorphism, operator overloading |
| 10 | **Java** | 35 | OOP fundamentals, collections, generics, interfaces, exceptions, streams, lambdas, annotations |
| 11 | **TypeScript** | 35 | Type annotations, interfaces, generics, enums, union types, utility types, type guards, decorators |
| 12 | **React** | 35 | JSX, components, props, state, hooks, effects, context, forms, conditional rendering, lists |
| 13 | **SQL** | 35 | SELECT, WHERE, JOIN, GROUP BY, ORDER BY, INSERT, UPDATE, DELETE, subqueries, aggregate functions |
| 14 | **Rust** | 35 | Ownership, borrowing, structs, enums, pattern matching, traits, generics, error handling, lifetimes |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/TedoNeObichaJavaScript/Sudo-Quest.git
cd Sudo-Quest

# Install dependencies
npm install

# Start the server
npm start
```

Open [http://localhost:3000](http://localhost:3000) and start solving.

---

## Commands

### Gameplay

| Command | Description |
|---------|-------------|
| `hint` | Reveal the next hint (costs 25 pts, 3 per level) |
| `explain` | Show the concept explanation for the current/last level |
| `skip` / `next` | Skip to the next level |
| `reset` | Reset the current level |
| `level N` | Jump to level N (1-35) in the current category |
| `levels` | Show all levels in the current category |
| `categories` | Return to category selection |

### Progress & Stats

| Command | Description |
|---------|-------------|
| `score` | Show score breakdown per level |
| `achievements` | Show all badges (earned and locked) |
| `stats` | Open the full stats dashboard |
| `streak` | Show login streak calendar (last 28 days) |
| `daily` | Show today's daily challenge |
| `review` | Show levels due for spaced review |
| `projects` | Show mini-projects for the current category |

### Learning

| Command | Description |
|---------|-------------|
| `learn` / `sandbox` | Enter the interactive learning sandbox |
| `playground` | Open a free-form JavaScript REPL |

### Customization & Data

| Command | Description |
|---------|-------------|
| `theme [name]` | Change theme (green, amber, cyan, purple, red, pink, blue, white) |
| `sound` | Toggle sound effects on/off |
| `save` | Export progress to clipboard (base64) |
| `load <data>` | Import progress from a save string |

### Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Run code |
| `Shift+Enter` | New line |
| `Tab` | Autocomplete command |
| `Up / Down` | Command history |
| `Ctrl+L` | Clear terminal |
| `Ctrl+/` or `?` | Toggle keyboard shortcut overlay |
| `Esc` | Close overlay / mobile drawer |

---

## Gamification

### Scoring
Every level starts at **100 points**. Each hint costs **25 pts**. Your total score is displayed in the header and tracked per-level.

### Achievements (19 Badges)

**Category Masters** — Complete all 35 levels in a category:
JS Master, Git Guru, Terminal Pro, HTML Hero, CSS Wizard, C# Champion, Python Tamer, C Veteran, C++ Architect, Java Juggernaut, TypeScript Titan, React Rockstar, SQL Sage, Rust Ranger

**Challenge Badges:**
| Badge | Condition |
|-------|-----------|
| Speed Demon | Complete any category in under 10 minutes |
| Solo Solver | Complete a category without using any hints |
| On Fire! | Achieve a 5-level first-try streak |
| Perfectionist | Score 100 on 10 different levels |
| Completionist | Complete all 490 levels |

### Streaks
Log in daily to build your streak. The `streak` command shows a visual 28-day calendar and your current/longest streak.

### Daily Challenges
A unique challenge is generated each day from the full pool of 490 levels. Run `daily` to see today's.

### Spaced Review
Levels where you struggled (2+ attempts or used hints) are automatically scheduled for review at 1, 3, and 7 day intervals.

---

## How It Works

```
+--------------+     +---------------+     +------------------+
|  User types  |---->|  Game Engine  |---->|  Sandbox Worker  |
|  code in     |     |  (app.js)     |     |  (Web Worker)    |
|  terminal    |     |               |     |                  |
|              |<----|  Validates    |<----|  Executes code   |
|  Gets result |     |  output       |     |  safely          |
+--------------+     +---------------+     +------------------+
```

1. **User input** is captured from the terminal-styled input field
2. **JavaScript levels** send code to a Web Worker sandbox that executes it safely and returns variables, console output, and errors
3. **Git & Terminal levels** process commands through simulated state machines with persistent state
4. **HTML, CSS, C#, and other text-based levels** validate code as text against expected patterns
5. **Validation functions** (defined per-level) check if the output matches expected results
6. **Progress** is saved to `localStorage` after each completed level

---

## Project Structure

```
sudo-quest/
├── public/
│   ├── index.html                  # Single page app shell
│   ├── css/
│   │   └── styles.css              # Terminal theme (pure CSS, 8 themes)
│   ├── js/
│   │   ├── app.js                  # Game engine (SudoQuest class, SoundManager, sandbox curriculum)
│   │   ├── levels.js               # Level orchestrator, imports all 14 categories
│   │   └── levels/                 # Per-category level definitions
│   │       ├── helpers.js          # Shared validation helpers
│   │       ├── js.js               # JavaScript levels (35)
│   │       ├── git.js              # Git levels (35)
│   │       ├── cmd.js              # Terminal levels (35)
│   │       ├── html.js             # HTML levels (35)
│   │       ├── css.js              # CSS levels (35)
│   │       ├── csharp.js           # C# levels (35)
│   │       ├── python.js           # Python levels (35)
│   │       ├── c.js                # C levels (35)
│   │       ├── cpp.js              # C++ levels (35)
│   │       ├── java.js             # Java levels (35)
│   │       ├── typescript.js       # TypeScript levels (35)
│   │       ├── react.js            # React levels (35)
│   │       ├── sql.js              # SQL levels (35)
│   │       └── rust.js             # Rust levels (35)
│   └── workers/
│       └── sandbox-worker.js       # Web Worker for safe code execution
├── server/
│   └── index.js                    # Express static server
├── package.json
└── LICENSE
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla JS (ES modules), CSS, HTML |
| Fonts | System monospace stack |
| Audio | Web Audio API (programmatic, no audio files) |
| Code Execution | Web Workers (sandboxed) |
| Server | Express.js |
| Storage | localStorage |

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=16&duration=4000&pause=2000&color=00FF41&center=true&vCenter=true&repeat=true&width=400&height=30&lines=%24+sudo+quest+--all;Happy+hacking!+%F0%9F%92%BB" alt="footer" />
</p>
