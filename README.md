# Android Build Workflow – Capacitor + Ionic/Angular

This guide walks you through the key steps to build an Android app using **Capacitor + Ionic/Angular**.

---

##  Prerequisites (per terminal session)

- **Node.js** `>= 20.19` (or `22.12`)
- **Android Studio** + Android SDK installed
- Set environment variables (example for PowerShell):

```bash
$env:JAVA_HOME        = "C:\Program Files\Android\Android Studio\jbr"
$env:Path             = "$env:JAVA_HOME\bin;$env:Path"
$env:ANDROID_SDK_ROOT = "$env:LOCALAPPDATA\Android\Sdk"
```

---

## 1️⃣ Initial Android Setup (run once in project root)

```bash
npm install
npm run build
npx cap add android
npx cap sync android
```

---

## 2️⃣ After Modifying Web Code (HTML / TS / SCSS / Assets)

```bash
npm run build
npx cap copy android
npx cap sync android   
```

---

## 3️⃣ After Dependency or Plugin Changes (package.json / Capacitor plugins)

```bash
npm install
npm run build
npx cap sync android
```

---

## 4️⃣ If Capacitor or Gradle Cache Misbehaves

```bash
npx cap sync android
cd android
./gradlew clean
```

---

## 5️⃣ Build Debug APK

```bash
cd android
./gradlew assembleDebug
```

**APK output location**:  
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

