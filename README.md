# =========================
# CAN-Remote-APP-v2 — Windows quick commands
# Copy/paste this whole block into README.md
# =========================

# --- Prereqs (one-time per session) ---
# Node >= 20.19 (or 22.12), Android Studio installed
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
$env:ANDROID_SDK_ROOT = "$env:LOCALAPPDATA\Android\Sdk"

# --- First-time Android setup (inside project root) ---
npm i
npm run build
npx cap add android
npx cap sync android

# --- After WEB code changes (src/*, HTML/TS/SCSS) ---
npm run build
npx cap copy android
npx cap sync android

# --- After PLUGIN / package.json changes ---
npm i
npm run build
npx cap sync android


# --- If Gradle/Capacitor cache acts weird ---
npx cap sync android
cd android
.\gradlew clean


# --- Build Debug APK (path shown below) ---
cd android
.\gradlew assembleDebug
# Output: android\app\build\outputs\apk\debug\app-debug.apk
