// ═══════════════════════════════════════════════════════════════
//  SUDO QUEST — Game Engine
// ═══════════════════════════════════════════════════════════════

import { LEVELS, TOTAL_LEVELS, getLevelById, getCategories, getLevelsByCategory } from './levels.js';

class SudoQuest {
  constructor() {
    // Game state
    this.currentLevelIndex = 0;
    this.attempts = {};        // levelId -> attempt count
    this.hintsRevealed = {};   // levelId -> number of hints revealed
    this.completedLevels = new Set();
    this.commandHistory = [];
    this.historyIndex = -1;
    this.isExecuting = false;

    // Git state (persists across commands within a git level)
    this.gitState = null;

    // DOM elements
    this.output = document.getElementById('output');
    this.input = document.getElementById('input');
    this.runBtn = document.getElementById('run-btn');
    this.levelIndicator = document.getElementById('level-indicator');
    this.progressFill = document.getElementById('progress-fill');
    this.categoryDisplay = document.getElementById('category-display');

    if (!this.input || !this.output) {
      console.error('Required DOM elements not found');
      return;
    }

    this.init();
  }

  // ── Initialization ──────────────────────────────────────────

  init() {
    this.loadProgress();
    this.setupEventListeners();
    this.showWelcome();
    this.loadLevel(this.currentLevelIndex);
  }

  setupEventListeners() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !this.isExecuting) {
        e.preventDefault();
        this.handleInput();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateHistory(-1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateHistory(1);
      }
    });

    this.runBtn.addEventListener('click', () => {
      if (!this.isExecuting) this.handleInput();
    });

    // Focus input when clicking anywhere on the terminal
    this.output.addEventListener('click', () => {
      this.input.focus();
    });

    // Keyboard shortcut: Ctrl+L to clear
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        this.clearTerminal();
        this.loadLevel(this.currentLevelIndex, true);
      }
    });
  }

  // ── Progress Persistence ────────────────────────────────────

  saveProgress() {
    const data = {
      currentLevelIndex: this.currentLevelIndex,
      completedLevels: [...this.completedLevels],
      attempts: this.attempts,
      hintsRevealed: this.hintsRevealed
    };
    try {
      localStorage.setItem('sudoquest_progress', JSON.stringify(data));
    } catch (_) { /* ignore storage errors */ }
  }

  loadProgress() {
    try {
      const data = JSON.parse(localStorage.getItem('sudoquest_progress'));
      if (data) {
        this.currentLevelIndex = data.currentLevelIndex || 0;
        this.completedLevels = new Set(data.completedLevels || []);
        this.attempts = data.attempts || {};
        this.hintsRevealed = data.hintsRevealed || {};
      }
    } catch (_) { /* ignore parse errors */ }
  }

  // ── Command History ─────────────────────────────────────────

  navigateHistory(direction) {
    if (this.commandHistory.length === 0) return;
    this.historyIndex += direction;

    if (this.historyIndex < 0) {
      this.historyIndex = -1;
      this.input.value = '';
      return;
    }
    if (this.historyIndex >= this.commandHistory.length) {
      this.historyIndex = this.commandHistory.length - 1;
    }
    this.input.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex] || '';
  }

  // ── Terminal Output ─────────────────────────────────────────

  addLine(text, type = 'default') {
    const line = document.createElement('div');
    line.className = `line line-${type}`;
    line.textContent = text;
    this.output.appendChild(line);
    this.scrollToBottom();
  }

  addHTML(html, type = 'default') {
    const line = document.createElement('div');
    line.className = `line line-${type}`;
    line.innerHTML = html;
    this.output.appendChild(line);
    this.scrollToBottom();
  }

  addBlank() {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = '&nbsp;';
    this.output.appendChild(line);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }

  clearTerminal() {
    this.output.innerHTML = '';
  }

  // ── Welcome Screen ─────────────────────────────────────────

  showWelcome() {
    const art = `
  ___  _   _  ___   ___     ___  _   _  ___  ___  _____
 / __|| | | ||   \\ / _ \\   / _ \\| | | || __|/ __||_   _|
 \\__ \\| |_| || |) | (_) | | (_) | |_| || _| \\__ \\  | |
 |___/ \\___/ |___/ \\___/   \\__\\_\\\\___/ |___||___/  |_|`;

    this.addHTML(`<pre class="ascii-art">${art}</pre>`, 'system');
    this.addBlank();
    this.addLine('Welcome to sudo quest! Learn to code, one command at a time.', 'system');
    this.addLine('Type your code and press Enter. Type "help" for commands.', 'dim');
    this.addBlank();
  }

  // ── Level Display ───────────────────────────────────────────

  loadLevel(index, quiet = false) {
    const level = LEVELS[index];
    if (!level) return;

    // Reset git state for git levels
    if (level.type === 'git') {
      this.gitState = this.createInitialGitState();
    }

    // Update header
    this.updateHeader(level);

    if (!quiet) {
      // Display level header in terminal
      const bar = '═'.repeat(56);
      this.addLine(`╔${bar}╗`, 'level-header');
      const title = `  LEVEL ${level.id}: ${level.title}`;
      const cat = `  Category: ${level.category}`;
      this.addLine(`║${title.padEnd(56)}║`, 'level-header');
      this.addLine(`║${cat.padEnd(56)}║`, 'level-header');
      this.addLine(`╚${bar}╝`, 'level-header');
      this.addBlank();
      this.addLine(`> ${level.question}`, 'question');
      this.addBlank();

      const id = level.id;
      const hintsUsed = this.hintsRevealed[id] || 0;
      if (hintsUsed > 0) {
        this.addLine(`Type 'hint' for help (${hintsUsed}/3 hints revealed).`, 'dim');
      } else {
        this.addLine("Type 'hint' if you need help (0/3 hints used).", 'dim');
      }
      this.addLine('─'.repeat(58), 'dim');
    }

    this.input.focus();
  }

  updateHeader(level) {
    if (this.levelIndicator) {
      this.levelIndicator.textContent = `Level ${level.id}/${TOTAL_LEVELS}`;
    }
    if (this.progressFill) {
      const pct = (this.completedLevels.size / TOTAL_LEVELS) * 100;
      this.progressFill.style.width = `${pct}%`;
    }
    if (this.categoryDisplay) {
      this.categoryDisplay.textContent = level.category;
    }
  }

  // ── Input Handling ──────────────────────────────────────────

  async handleInput() {
    const raw = this.input.value;
    const trimmed = raw.trim();
    this.input.value = '';

    if (!trimmed) return;

    // Save to history
    if (this.commandHistory[this.commandHistory.length - 1] !== trimmed) {
      this.commandHistory.push(trimmed);
      if (this.commandHistory.length > 100) this.commandHistory.shift();
    }
    this.historyIndex = -1;

    // Show the command
    this.addLine(`$ ${trimmed}`, 'command');

    // Check for special commands
    const lower = trimmed.toLowerCase();
    if (this.handleSpecialCommand(lower)) return;

    // Execute the input
    this.isExecuting = true;
    this.runBtn.textContent = '...';
    this.runBtn.disabled = true;

    try {
      const level = LEVELS[this.currentLevelIndex];

      if (level.type === 'git') {
        await this.executeGit(trimmed, level);
      } else {
        await this.executeJS(trimmed, level);
      }
    } catch (err) {
      this.addLine(`Error: ${err.message}`, 'error');
    } finally {
      this.isExecuting = false;
      this.runBtn.textContent = 'RUN';
      this.runBtn.disabled = false;
      this.input.focus();
    }
  }

  handleSpecialCommand(cmd) {
    if (cmd === 'help') {
      this.showHelp();
      return true;
    }
    if (cmd === 'hint') {
      this.revealHint();
      return true;
    }
    if (cmd === 'clear') {
      this.clearTerminal();
      this.loadLevel(this.currentLevelIndex, true);
      return true;
    }
    if (cmd === 'reset') {
      this.resetLevel();
      return true;
    }
    if (cmd === 'levels') {
      this.showLevels();
      return true;
    }
    if (cmd === 'skip' || cmd === 'next') {
      this.skipLevel();
      return true;
    }
    if (cmd.startsWith('level ')) {
      const num = parseInt(cmd.split(' ')[1]);
      if (!isNaN(num)) {
        this.jumpToLevel(num);
        return true;
      }
    }
    return false;
  }

  // ── Special Commands ────────────────────────────────────────

  showHelp() {
    this.addBlank();
    this.addLine('╔══════════════════════════════════════╗', 'system');
    this.addLine('║          AVAILABLE COMMANDS          ║', 'system');
    this.addLine('╠══════════════════════════════════════╣', 'system');
    this.addLine('║  hint    — Reveal next hint          ║', 'system');
    this.addLine('║  clear   — Clear terminal            ║', 'system');
    this.addLine('║  reset   — Reset current level       ║', 'system');
    this.addLine('║  levels  — Show all levels           ║', 'system');
    this.addLine('║  level N — Jump to level N           ║', 'system');
    this.addLine('║  skip    — Skip to next level        ║', 'system');
    this.addLine('║  help    — Show this help            ║', 'system');
    this.addLine('╚══════════════════════════════════════╝', 'system');
    this.addBlank();
  }

  revealHint() {
    const level = LEVELS[this.currentLevelIndex];
    const id = level.id;
    const revealed = this.hintsRevealed[id] || 0;

    if (revealed >= 3) {
      this.addLine('All hints already revealed!', 'dim');
      // Show all hints again
      level.hints.forEach((h, i) => {
        const prefix = i === 2 ? 'ANSWER' : `Hint ${i + 1}`;
        this.addLine(`  ${prefix}: ${h}`, 'hint');
      });
      return;
    }

    const attemptsForLevel = this.attempts[id] || 0;
    if (attemptsForLevel < 1 && revealed === 0) {
      this.addLine('Try at least once before asking for a hint!', 'dim');
      return;
    }

    this.hintsRevealed[id] = revealed + 1;
    const hintIndex = revealed;
    const hint = level.hints[hintIndex];
    const prefix = hintIndex === 2 ? 'ANSWER' : `Hint ${hintIndex + 1}`;

    this.addBlank();
    this.addLine(`💡 ${prefix}: ${hint}`, 'hint');
    this.addBlank();

    this.saveProgress();
  }

  resetLevel() {
    const level = LEVELS[this.currentLevelIndex];
    this.attempts[level.id] = 0;
    this.hintsRevealed[level.id] = 0;
    if (level.type === 'git') {
      this.gitState = this.createInitialGitState();
    }
    this.clearTerminal();
    this.addLine('[SYSTEM] Level reset.', 'dim');
    this.addBlank();
    this.loadLevel(this.currentLevelIndex);
    this.saveProgress();
  }

  showLevels() {
    this.addBlank();
    const categories = getCategories();
    for (const cat of categories) {
      this.addLine(`  ── ${cat} ──`, 'level-header');
      const levels = getLevelsByCategory(cat);
      for (const l of levels) {
        const completed = this.completedLevels.has(l.id);
        const current = LEVELS[this.currentLevelIndex].id === l.id;
        const marker = completed ? '✓' : current ? '>' : ' ';
        const status = completed ? 'success' : current ? 'question' : 'dim';
        this.addLine(`  ${marker} Level ${l.id}: ${l.title}`, status);
      }
    }
    this.addBlank();
    this.addLine('Type "level N" to jump to a level.', 'dim');
    this.addBlank();
  }

  skipLevel() {
    if (this.currentLevelIndex < LEVELS.length - 1) {
      this.currentLevelIndex++;
      this.addBlank();
      this.addLine('[SYSTEM] Skipping to next level...', 'dim');
      this.addBlank();
      this.loadLevel(this.currentLevelIndex);
      this.saveProgress();
    } else {
      this.addLine('You\'re on the last level!', 'dim');
    }
  }

  jumpToLevel(num) {
    const idx = LEVELS.findIndex(l => l.id === num);
    if (idx === -1) {
      this.addLine(`Level ${num} doesn't exist. Type 'levels' to see all levels.`, 'error');
      return;
    }
    this.currentLevelIndex = idx;
    this.clearTerminal();
    this.loadLevel(this.currentLevelIndex);
    this.saveProgress();
  }

  // ── JavaScript Execution ────────────────────────────────────

  async executeJS(code, level) {
    const result = await this.runInSandbox(code);

    // Show console output
    if (result.consoleLogs && result.consoleLogs.length > 0) {
      for (const log of result.consoleLogs) {
        this.addLine(log, 'output');
      }
    }

    // Validate
    const validation = level.validate(code, result);

    if (validation.passed) {
      this.onLevelPassed(level);
    } else {
      this.onLevelFailed(level, validation.feedback);
    }
  }

  async runInSandbox(code, timeout = 3000) {
    return new Promise((resolve) => {
      let worker;
      try {
        worker = new Worker('/workers/sandbox-worker.js');
      } catch (_) {
        // Fallback: execute inline (less safe but works)
        resolve(this.executeInline(code));
        return;
      }

      const timer = setTimeout(() => {
        worker.terminate();
        resolve({
          variables: {},
          functions: {},
          consoleLogs: [],
          errors: ['Code timed out — possible infinite loop. Check your loop conditions.'],
          timeout: true
        });
      }, timeout);

      worker.onmessage = (e) => {
        clearTimeout(timer);
        worker.terminate();
        resolve(e.data);
      };

      worker.onerror = (e) => {
        clearTimeout(timer);
        worker.terminate();
        resolve({
          variables: {},
          functions: {},
          consoleLogs: [],
          errors: [e.message || 'Execution error'],
          timeout: false
        });
      };

      worker.postMessage({ code, requestId: Date.now().toString() });
    });
  }

  executeInline(code) {
    // Fallback execution if Worker fails (e.g., file:// protocol)
    const logs = [];
    const mockConsole = {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
    };

    try {
      const names = new Set();
      for (const m of code.matchAll(/(?:var|let|const)\s+([a-zA-Z_$]\w*)/g)) names.add(m[1]);
      for (const m of code.matchAll(/function\s+([a-zA-Z_$]\w*)/g)) names.add(m[1]);

      const captures = [...names].map(n =>
        `try{__v["${n}"]=${n};__t["${n}"]=typeof ${n}}catch(_){}`
      ).join(';');

      const wrapped = `var console=arguments[0];${code};var __v={},__t={};${captures};return{v:__v,t:__t}`;
      const fn = new Function(wrapped);
      const r = fn(mockConsole);

      const variables = {}, functions = {};
      for (const k in r.v) {
        if (r.t[k] === 'function') functions[k] = true;
        else variables[k] = r.v[k];
      }

      return { variables, functions, consoleLogs: logs, errors: [], timeout: false };
    } catch (e) {
      return { variables: {}, functions: {}, consoleLogs: logs, errors: [e.message], timeout: false };
    }
  }

  // ── Git Execution ───────────────────────────────────────────

  async executeGit(command, level) {
    if (!this.gitState) {
      this.gitState = this.createInitialGitState();
    }

    // Parse the command
    const result = this.executeGitCommand(command);

    if (result.error) {
      this.addLine(`error: ${result.error}`, 'error');
    } else if (result.message) {
      this.addLine(result.message, 'output');
    }

    // Validate current git state
    const validation = level.validate(this.gitState);

    if (validation.passed) {
      this.onLevelPassed(level);
    } else {
      // Don't show failure for git levels on each command —
      // just show the feedback as a guide for next steps
      if (!result.error) {
        this.addLine(validation.feedback, 'dim');
      }
    }
  }

  executeGitCommand(input) {
    const trimmed = input.trim();
    const parts = this.parseCommandParts(trimmed);

    // Handle file creation: echo "content" > filename
    if (trimmed.startsWith('echo ') || trimmed.includes('>')) {
      return this.handleFileCreation(trimmed);
    }

    if (!trimmed.startsWith('git ')) {
      return { error: 'Not a recognized command. Use git commands or echo to create files.' };
    }

    const gitParts = parts.slice(1); // Remove 'git'
    const gitCmd = gitParts[0];
    const args = gitParts.slice(1);

    switch (gitCmd) {
      case 'init': return this.gitInit();
      case 'add': return this.gitAdd(args);
      case 'commit': return this.gitCommit(args);
      case 'branch': return this.gitBranch(args);
      case 'checkout': return this.gitCheckout(args);
      case 'status': return this.gitStatus();
      case 'log': return this.gitLog();
      default: return { error: `Unknown git command: ${gitCmd}` };
    }
  }

  parseCommandParts(input) {
    // Parse command respecting quoted strings
    const parts = [];
    let current = '';
    let inQuote = false;
    let quoteChar = '';

    for (const char of input) {
      if ((char === '"' || char === "'") && !inQuote) {
        inQuote = true;
        quoteChar = char;
      } else if (char === quoteChar && inQuote) {
        inQuote = false;
      } else if (char === ' ' && !inQuote) {
        if (current) parts.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    if (current) parts.push(current);
    return parts;
  }

  createInitialGitState() {
    return {
      initialized: false,
      HEAD: null,
      currentBranch: null,
      branches: {},
      commits: [],
      index: {},
      workingDirectory: {},
      _fileCreated: false,
      _fileStaged: false,
      _committed: false
    };
  }

  gitInit() {
    if (this.gitState.initialized) {
      return { message: 'Reinitialized existing Git repository' };
    }
    this.gitState.initialized = true;
    this.gitState.HEAD = 'refs/heads/main';
    this.gitState.currentBranch = 'main';
    this.gitState.branches = {
      main: { name: 'main', commit: null, commits: [] }
    };
    this.gitState.commits = [];
    this.gitState.index = {};
    return { message: 'Initialized empty Git repository in .git/' };
  }

  gitAdd(args) {
    if (!this.gitState.initialized) return { error: 'Not a git repository. Run "git init" first.' };
    const file = args[0];
    if (!file) return { error: 'No file specified. Usage: git add <filename>' };
    if (file === '.') {
      // Stage all files in working directory
      const files = Object.keys(this.gitState.workingDirectory);
      if (files.length === 0) return { error: 'Nothing to add.' };
      for (const f of files) {
        this.gitState.index[f] = this.gitState.workingDirectory[f];
      }
      this.gitState._fileStaged = true;
      return { message: `Staged ${files.length} file(s)` };
    }
    if (!(file in this.gitState.workingDirectory)) return { error: `fatal: pathspec '${file}' did not match any files` };
    this.gitState.index[file] = this.gitState.workingDirectory[file];
    this.gitState._fileStaged = true;
    return { message: `Staged '${file}'` };
  }

  gitCommit(args) {
    if (!this.gitState.initialized) return { error: 'Not a git repository.' };

    let message = '';
    const mIndex = args.indexOf('-m');
    if (mIndex !== -1 && args[mIndex + 1]) {
      message = args[mIndex + 1];
    } else {
      return { error: 'Commit message required. Usage: git commit -m "message"' };
    }

    const stagedFiles = Object.keys(this.gitState.index);
    if (stagedFiles.length === 0) return { error: 'Nothing to commit. Stage files with git add first.' };

    const hash = Math.random().toString(36).substring(2, 9);
    const branch = this.gitState.currentBranch || 'main';
    const commit = {
      hash,
      message,
      files: [...stagedFiles],
      timestamp: Date.now(),
      parent: this.gitState.branches[branch]?.commit || null
    };

    this.gitState.commits.unshift(commit);
    this.gitState.branches[branch].commit = hash;
    this.gitState.branches[branch].commits.push(hash);
    this.gitState.index = {};
    this.gitState._committed = true;

    return { message: `[${branch} ${hash}] ${message}\n ${stagedFiles.length} file(s) changed` };
  }

  gitBranch(args) {
    if (!this.gitState.initialized) return { error: 'Not a git repository.' };
    if (!args[0]) {
      // List branches
      const branches = Object.keys(this.gitState.branches);
      const lines = branches.map(b => `${b === this.gitState.currentBranch ? '* ' : '  '}${b}`);
      return { message: lines.join('\n') };
    }

    const name = args[0];
    if (this.gitState.branches[name]) return { error: `Branch '${name}' already exists.` };
    if (this.gitState.commits.length === 0) return { error: 'Cannot create branch: no commits yet.' };

    const currentCommit = this.gitState.branches[this.gitState.currentBranch]?.commit;
    this.gitState.branches[name] = {
      name,
      commit: currentCommit,
      commits: currentCommit ? [currentCommit] : []
    };
    return { message: `Created branch '${name}'` };
  }

  gitCheckout(args) {
    if (!this.gitState.initialized) return { error: 'Not a git repository.' };
    if (!args[0]) return { error: 'Branch name required.' };

    if (args[0] === '-b') {
      const name = args[1];
      if (!name) return { error: 'Branch name required after -b.' };
      if (this.gitState.commits.length === 0) return { error: 'Cannot create branch: no commits yet.' };
      const branchResult = this.gitBranch([name]);
      if (branchResult.error) return branchResult;
      this.gitState.HEAD = `refs/heads/${name}`;
      this.gitState.currentBranch = name;
      return { message: `Switched to a new branch '${name}'` };
    }

    const target = args[0];
    if (!this.gitState.branches[target]) return { error: `error: pathspec '${target}' did not match any branch.` };
    this.gitState.HEAD = `refs/heads/${target}`;
    this.gitState.currentBranch = target;
    return { message: `Switched to branch '${target}'` };
  }

  gitStatus() {
    if (!this.gitState.initialized) return { error: 'Not a git repository.' };
    const staged = Object.keys(this.gitState.index);
    const working = Object.keys(this.gitState.workingDirectory);
    const unstaged = working.filter(f => !(f in this.gitState.index));

    let msg = `On branch ${this.gitState.currentBranch}\n`;
    if (staged.length > 0) {
      msg += '\nChanges to be committed:\n';
      staged.forEach(f => { msg += `  new file: ${f}\n`; });
    }
    if (unstaged.length > 0) {
      msg += '\nUntracked files:\n';
      unstaged.forEach(f => { msg += `  ${f}\n`; });
    }
    if (staged.length === 0 && unstaged.length === 0) {
      msg += '\nNothing to commit, working tree clean';
    }
    return { message: msg };
  }

  gitLog() {
    if (!this.gitState.initialized) return { error: 'Not a git repository.' };
    if (this.gitState.commits.length === 0) return { message: 'No commits yet.' };
    const lines = this.gitState.commits.map(c =>
      `commit ${c.hash}\n  ${c.message}`
    );
    return { message: lines.join('\n\n') };
  }

  handleFileCreation(command) {
    const match = command.match(/echo\s+["']?([^"'>]+)["']?\s*>\s*(\S+)/);
    if (match) {
      const content = match[1].trim();
      const filename = match[2];
      this.gitState.workingDirectory[filename] = content;
      this.gitState._fileCreated = true;
      return { message: `Created file '${filename}'` };
    }
    return { error: 'Invalid syntax. Use: echo "content" > filename' };
  }

  // ── Level Pass/Fail ─────────────────────────────────────────

  onLevelPassed(level) {
    this.addBlank();
    this.addLine('╔══════════════════════════════════════╗', 'success');
    this.addLine('║         ✓  LEVEL COMPLETE!          ║', 'success');
    this.addLine('╚══════════════════════════════════════╝', 'success');
    this.addBlank();
    if (level.successMessage) {
      this.addLine(level.successMessage, 'success-message');
    }
    this.addBlank();

    // Mark as completed
    this.completedLevels.add(level.id);
    this.saveProgress();

    // Check if game complete
    if (this.completedLevels.size === TOTAL_LEVELS) {
      this.showGameComplete();
      return;
    }

    // Advance to next level
    if (this.currentLevelIndex < LEVELS.length - 1) {
      this.currentLevelIndex++;
      this.saveProgress();
      this.addLine('Loading next level...', 'dim');
      this.addBlank();

      setTimeout(() => {
        this.loadLevel(this.currentLevelIndex);
      }, 1500);
    }
  }

  onLevelFailed(level, feedback) {
    const id = level.id;
    this.attempts[id] = (this.attempts[id] || 0) + 1;
    this.saveProgress();

    this.addLine(`✗ ${feedback}`, 'error');

    // Show hint availability
    const hintsUsed = this.hintsRevealed[id] || 0;
    if (hintsUsed < 3) {
      this.addLine(`Type 'hint' for help (${hintsUsed}/3 hints revealed).`, 'dim');
    }
  }

  // ── Game Complete ───────────────────────────────────────────

  showGameComplete() {
    this.addBlank();
    const art = `
  ╔═══════════════════════════════════════════════════╗
  ║                                                   ║
  ║     🎉  CONGRATULATIONS!  🎉                     ║
  ║                                                   ║
  ║     You've completed all ${TOTAL_LEVELS} levels!             ║
  ║     You now know the fundamentals of              ║
  ║     JavaScript and Git!                           ║
  ║                                                   ║
  ║     Keep coding. Keep building. Keep learning.    ║
  ║                                                   ║
  ╚═══════════════════════════════════════════════════╝`;
    this.addHTML(`<pre class="completion-art">${art}</pre>`, 'success');
    this.addBlank();
    this.addLine('Type "levels" to replay any level, or "reset" to start fresh.', 'dim');
  }
}

// ── Bootstrap ─────────────────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new SudoQuest());
} else {
  new SudoQuest();
}
