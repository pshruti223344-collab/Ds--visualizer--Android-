# DS Visualizer — Android project

A mobile-friendly Data Structure Visualizer using HTML, CSS, JavaScript and Capacitor.

## Features
- Stack: Push, Pop, Peek
- Queue: Enqueue, Dequeue, Front
- Linked List: Add at end, Delete first, Find
- Linear Search with highlighted result
- Bubble Sort with step-by-step comparisons/swaps
- Reset and mobile responsive layout

## Requirements
- Windows / macOS / Linux computer
- Node.js 22+ (LTS recommended)
- Android Studio and Android SDK
- VS Code (recommended editor)

## Run as a web app
Open this folder in VS Code. In the terminal:
```bash
npm install
npm run start
```
Open the local URL shown in the terminal.

## Create the Android project
From this folder, run:
```bash
npm install
npx cap add android
npx cap sync android
npx cap open android
```
If `android` already exists, do not run `npx cap add android` again; use `npx cap sync android`.

In Android Studio, wait for Gradle sync, select an emulator or connected Android phone, and press Run.

## Build a debug APK
In Android Studio, use **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
The APK is normally created at:
`android/app/build/outputs/apk/debug/app-debug.apk`

Or, from the `android` folder on Windows:
```bat
gradlew.bat assembleDebug
```
On macOS/Linux:
```bash
./gradlew assembleDebug
```

## Important
- This project is a working starter project. You must build the APK on a computer with Android SDK installed.
- For production distribution, create a signed release APK in Android Studio.
- The Google Fonts import is optional; the app falls back to system fonts offline.
