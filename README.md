![Latest stable](https://img.shields.io/github/v/release/yatstudio/bigfootMD?display_name=tag) [![CI](https://github.com/yatstudio/bigfootMD/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/yatstudio/bigfootMD/actions/workflows/ci.yml) [![Codecov](https://codecov.io/gh/yatstudio/bigfootMD/graph/badge.svg?branch=main)](https://codecov.io/gh/yatstudio/bigfootMD) [![CodeScene Hotspot Code Health](https://codescene.io/projects/76865/status-badges/hotspot-code-health)](https://codescene.io/projects/76865)

# 💧 Bigfoot Note

Bigfoot Note is a desktop app for macOS, Windows, and Linux for managing **markdown knowledge bases**. People use it for a variety of use cases:

* Operate second brains and personal knowledge
* Organize company docs as context for AI
* Store OpenClaw/assistants memory and procedures

Personally, I use it to **run my life** (hey 👋 [Luca here](http://x.com/lucaronin)). I have a massive workspace of 10,000+ notes, which are the result of my [Bigfoot Capital](https://bigfoot.capital/) work + a ton of personal journaling and *second braining*.

<img width="1000" height="656" alt="1776506856823-CleanShot_2026-04-18_at_12 06 57_2x" src="https://github.com/user-attachments/assets/8aeafb0a-b236-43c2-a083-ec111f903c38" />

## Walkthroughs

You can find some Loom walkthroughs below — they are short and to the point:
- [How I Organize My Own Bigfoot Note Workspace](https://www.loom.com/share/bb3aaffa238b4be0bd62e4464bca2528)
- [My Inbox Workflow](https://www.loom.com/share/dffda263317b4fa8b47b59cdf9330571)
- [How I Save Web Resources to Bigfoot Note](https://www.loom.com/share/8a3c1776f801402ebbf4d7b0f31e9882)

## Principles

- 📑 **Files-first** — Your notes are plain markdown files. They're portable, work with any editor, and require no export step. Your data belongs to you, not to any app.
- 🔌 **Git-first** — Every vault is a git repository. You get full version history, the ability to use any git remote, and zero dependency on Bigfoot Note servers.
- 🛜 **Offline-first, zero lock-in** — No accounts, no subscriptions, no cloud dependencies. Your vault works completely offline and always will. If you stop using Bigfoot Note, you lose nothing.
- 🔬 **Open source** — Bigfoot Note is free and open source. I built this for [myself](https://x.com/lucaronin) and for sharing it with others.
- 📋 **Standards-based** — Notes are markdown files with YAML frontmatter. No proprietary formats, no locked-in data. Everything works with standard tools if you decide to move away from Bigfoot Note.
- 🔍 **Types as lenses, not schemas** — Types in Bigfoot Note are navigation aids, not enforcement mechanisms. There's no required fields, no validation, just helpful categories for finding notes.
- 🪄**AI-first but not AI-only** — A vault of files works very well with AI agents, but you are free to use whatever you want. We support Claude Code, Codex CLI, and Gemini CLI setup paths, but you can edit the vault with any AI you want. We provide an AGENTS file for your agents to figure out.
- ⌨️ **Keyboard-first** — Bigfoot Note is designed for power-users who want to use keyboard as much as possible. A lot of how we designed the Editor and the Command Palette is based on this.
- 💪 **Built from real use** — Bigfoot Note was created for manage my personal vault of 10,000+ notes, and I use it every day. Every feature exists because it solved a real problem.

## Installation

### Homebrew

Install via Homebrew on macOS:

```batch
brew install --cask bigfoot
```

### Download from releases

Download the [latest release here](https://bigfoot.capital/bigfootMD/download/) for macOS, Windows, or Linux. Windows installers are Authenticode-signed; company-managed devices may still require IT approval of the Bigfoot Note publisher before first install.

## Getting started

When you open Bigfoot Note for the first time you get the chance of cloning the [getting started vault](https://github.com/yatstudio/bigfootMD-getting-started) — which gives you a walkthrough of the whole app.

The public user docs live in [`site/`](site/) and are published to GitHub Pages. Start with [Install Bigfoot Note](site/start/install.md), then [First Launch](site/start/first-launch.md).

## Open source and local setup

Bigfoot Note is open source and built with Tauri, React, and TypeScript. If you want to run or contribute to the app locally, here is [how to get started](https://github.com/yatstudio/bigfootMD/blob/main/docs/GETTING-STARTED.md). You can also find the gist below 👇

### Prerequisites

- Node.js 20+
- pnpm 8+
- Rust stable
- macOS or Linux for development

#### Linux system dependencies

Tauri 2 on Linux requires WebKit2GTK 4.1 and GTK 3:

- Arch / Manjaro:
  ```bash
  sudo pacman -S --needed webkit2gtk-4.1 base-devel curl wget file openssl \
    appmenu-gtk-module libappindicator-gtk3 librsvg
  ```
- Debian / Ubuntu (22.04+):
  ```bash
  sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file \
    libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev \
    libsoup-3.0-dev patchelf
  ```
- Fedora 38+:
  ```bash
  sudo dnf install webkit2gtk4.1-devel openssl-devel curl wget file \
    libappindicator-gtk3-devel librsvg2-devel
  ```

The bundled MCP server still spawns the system `node` binary at runtime on Linux, so install Node from your distro package manager if you want the external AI tooling flow.

### Quick start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173` for the browser-based mock mode, or run the native desktop app with:

```bash
pnpm tauri dev
```

## Tech Docs

- 📐 [ARCHITECTURE.md](docs/ARCHITECTURE.md) — System design, tech stack, data flow
- 🧩 [ABSTRACTIONS.md](docs/ABSTRACTIONS.md) — Core abstractions and models
- 🚀 [GETTING-STARTED.md](docs/GETTING-STARTED.md) — How to navigate the codebase
- 📚 [ADRs](docs/adr) — Architecture Decision Records

## Security

If you believe you have found a security issue, please report it privately as described in [SECURITY.md](./SECURITY.md).

## License

Bigfoot Note is licensed under AGPL-3.0-or-later. The Bigfoot Note name and logo remain covered by the project’s trademark policy.
