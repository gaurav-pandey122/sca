# Singon Customer App

A modern React Native mobile application for delivery and logistics services built with Expo and TypeScript.

## 📱 About

Singon Customer App is a comprehensive delivery and logistics platform that allows users to:

- **Express Delivery**: Fast same-day delivery with real-time tracking
- **Standard Delivery**: Affordable delivery with flexible scheduling
- **Intercity Delivery**: Long-distance delivery between cities
- **House Moving**: Complete home relocation services
- **Vehicle Rental**: Rent vehicles for personal use

### Key Features

- 🗺️ Real-time order tracking with OpenStreetMap integration
- 🚴 Live rider location and ETA updates
- 📦 Multiple delivery service types
- 👤 User profile management with photo upload
- 📍 Address management with map picker
- 📜 Order history and status tracking
- 🔐 Email/password authentication

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev) ~54.0
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **UI Components**: React Native
- **Maps**: OpenStreetMap with Leaflet.js
- **Routing**: Leaflet Routing Machine with custom OSRM server
- **Icons**: @expo/vector-icons (Ionicons, MaterialCommunityIcons)
- **State Management**: React Hooks
- **Storage**: AsyncStorage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher ([Download](https://nodejs.org/))
- **npm**: v9.x or higher (comes with Node.js)
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **Git**: For version control

### Platform-Specific Requirements

#### For Android Development:
- **Android Studio**: Latest version
- **Android SDK**: API Level 33 or higher
- **Java Development Kit (JDK)**: Version 17

#### For iOS Development (macOS only):
- **Xcode**: Latest version from App Store
- **CocoaPods**: Install with `sudo gem install cocoapods`
- **iOS Simulator**: Included with Xcode

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SingonCustomerApp
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Expo SDK and modules
- React Native dependencies
- Navigation libraries
- Map components
- UI libraries

### 3. Start Development Server

```bash
npm start
# or
npx expo start
```

This will start the Expo development server and show a QR code in your terminal.

### 4. Run on Device/Emulator

#### Option A: Expo Go (Quickest)
1. Install Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Scan the QR code from the terminal

#### Option B: Development Build
```bash
# For Android
npm run android

# For iOS (macOS only)
npm run ios
```

#### Option C: Web (Limited functionality)
```bash
npm run web
```

## 📦 Project Structure

```
SingonCustomerApp/
├── app/                      # Main application code (Expo Router)
│   ├── (auth)/              # Authentication screens
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/              # Main tab navigation
│   │   ├── index.tsx        # Home screen
│   │   ├── history.tsx      # Order history
│   │   ├── profile.tsx      # User profile
│   │   └── _layout.tsx      # Tab layout
│   ├── shipment/            # Shipment creation screens
│   │   ├── create.tsx       # Service selection
│   │   ├── standard.tsx     # Standard delivery
│   │   ├── intercity.tsx    # Intercity delivery
│   │   ├── moving.tsx       # House moving
│   │   └── rent.tsx         # Vehicle rental
│   ├── tracking/            # Order tracking
│   │   └── [id].tsx         # Dynamic tracking screen
│   ├── profile/             # Profile management
│   │   ├── edit.tsx
│   │   └── addresses/
│   ├── _layout.tsx          # Root layout
│   └── +not-found.tsx       # 404 screen
├── components/              # Reusable components
│   └── OrderCard.tsx
├── constants/               # App constants
│   ├── Colors.ts
│   └── Styles.ts
├── context/                 # React Context
│   └── AuthContext.tsx
├── assets/                  # Images, fonts, etc.
├── package.json
└── app.json                 # Expo configuration
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS simulator (macOS only) |
| `npm run web` | Run in web browser |
| `npm run lint` | Run ESLint |

## 🏗️ Build Process

### Development Build

For development with native modules:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project
eas build:configure

# Build for Android
eas build --platform android --profile development

# Build for iOS
eas build --platform ios --profile development
```

### Production Build

#### Android APK/AAB

```bash
# Build APK (for testing)
eas build --platform android --profile preview

# Build AAB (for Google Play Store)
eas build --platform android --profile production
```

#### iOS IPA

```bash
# Build for TestFlight/App Store
eas build --platform ios --profile production
```

### Local Builds

For local builds without EAS:

```bash
# Android (using Expo)
npx expo run:android --variant release

# iOS (requires macOS and Xcode)
npx expo run:ios --configuration Release
```

#### Native Android Build with Gradle

For direct Gradle builds:

```bash
# Navigate to android directory and build
cd android && ./gradlew assembleRelease

# The APK will be generated at:
# android/app/build/outputs/apk/release/app-release.apk

# Install on connected device
adb install android/app/build/outputs/apk/release/app-release.apk

# Or install and launch
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

**Note**: Before building with Gradle, ensure you have:
1. Generated the `android` folder by running `npx expo prebuild`
2. Configured signing keys in `android/app/build.gradle`
3. Connected an Android device or started an emulator


## 🔑 Environment Configuration

Create a `.env` file in the root directory (if needed):

```env
API_BASE_URL=https://api.example.com
OSRM_SERVER_URL=https://osmr.smarten.com.np/route/v1
```

## 🗺️ Map Configuration

The app uses OpenStreetMap with a custom OSRM routing server:

- **Tile Server**: `https://tile.openstreetmap.org`
- **Routing Server**: `https://osmr.smarten.com.np/route/v1`

To use a different OSRM server, update the `serviceUrl` in `app/tracking/[id].tsx`.

## 📱 App Configuration

Key settings in `app.json`:

```json
{
  "expo": {
    "name": "Singon Customer",
    "slug": "singoncustomerapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "singoncustomer",
    "platforms": ["ios", "android"]
  }
}
```

## 🐛 Debugging

### Enable Debug Mode

```bash
# Start with debug mode
npx expo start --dev-client

# View logs
npx expo start --dev-client --clear
```

### Common Issues

**Issue**: Metro bundler cache issues
```bash
# Clear cache
npx expo start --clear
```

**Issue**: Native module errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**Issue**: iOS build fails
```bash
# Clean iOS build
cd ios && pod install && cd ..
```

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

Developed by the Singon development team.

## 📞 Support

For support and queries, contact: support@singon.com

---

**Version**: 1.0.0  
**Last Updated**: November 2025
