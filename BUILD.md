# 🛠️ Build Guide — Delta-GIS
Delta-GIS is a cross-platform application built with React, TypeScript, and Tauri.\
It provides a lightweight graphical interface for comparing electrical data between two systems.

This guide explains how to build the application on Windows, macOS, and Linux.

## ✅ Prerequisites
1. Node.js ≥ 18

2. pnpm (recommended)\
Install it globally:
```bash
npm install -g pnpm
```
3. Rust\
Install it with:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

4. Tauri CLI\
Run:
```bash
pnpm dlx @tauri-apps/cli@latest
```

## <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg" width='24' height='24' /> Windows
### Additional Requirements
- Visual Studio Build Tools
Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/ \
Select "Desktop development with C++"\
Include:\
  - MSVC (latest version)
  - Windows 10 or 11 SDK
  - CMake

### Build Steps
```bash
pnpm install
pnpm build
pnpm tauri build
```

Output:
```bash
src-tauri/target/release/bundle/msi/*.msi
```

## <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" width='24' height='24' /> macOS
Additional Requirements
Xcode
Install with:
```bash
xcode-select --install
```

Build Steps
```bash
pnpm install
pnpm build
pnpm tauri build
```

Output:
```bash
src-tauri/target/release/bundle/dmg/*.dmg
```
<!-- ./src/assets/markdowns/icons8-linux-48.png
./src/assets/markdowns/icons8-mac-os-50.png
./src/assets/markdowns/icons8-windows-os-48.png -->

## <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" width='24' height='24' /> Linux
Additional Requirements (Debian/Ubuntu)
```bash
sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget file libssl-dev libgtk-3-dev
```

## Build Steps
```bash
pnpm install
pnpm build
pnpm tauri build
```

## Output:
```bash
.deb or .AppImage depending on configuration
```

## 📂 Build Output Structure
src-tauri/\
┗━ target/\
  ┗━ release/\
    ┗━ bundle/\
      ┣━ msi/ (Windows)\
      ┣━ dmg/ (macOS)\
      ┗━ deb/ (Linux)

## 🆘 Troubleshooting
Tauri Docs: https://tauri.app/v1/guides/

Rust Docs: https://doc.rust-lang.org/book/ch01-01-installation.html

Linux Dependencies: https://tauri.app/v1/guides/getting-started/prerequisites/#linux

## ⬅️ [Return to Readme](README.md)