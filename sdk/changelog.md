# React Native SDK changelog

Revopush maintains two SDK release lines and an Expo config plugin:

- **2.x** is the current SDK with differential update support.
- **1.x** is the maintenance line for applications that have not migrated to 2.x.
- **Expo config plugin** applies the required iOS and Android configuration during Expo prebuild.

## SDK 2.x

### 2.6.1 — September 7, 2026

- Added shadow base release support on Android and iOS: a differential update can now be applied against a previous OTA release, not only the bundle shipped in the binary.

### 2.5.2 — September 7, 2026

- Backported shadow base release support from 2.6.1.

### 2.6.0 — June 22, 2026

- Added React Native 0.83 compatibility on Android and iOS, including updated native-module and React host integration.
- Fixed asset-hash calculation for native iOS releases.
- Fixed Android compilation after the React Native 0.83 changes.

### 2.5.1 — June 11, 2026

- Fixed iOS asset-hash calculation when an OTA update is based on a native release.

### 2.5.0 — May 25, 2026

- Added differential OTA updates on both iOS and Android. Updates can reuse the native bundle and assets instead of downloading a complete package.
- Added native-build metadata generation for bundled resources, asset hashes, and the application manifest.
- Added native build-number reporting (`CFBundleVersion` on iOS and `versionCode` on Android), enabling releases to target a specific build.
- Moved the Android differential-update runtime to Maven Central and updated it with 16 KB page-alignment support.
- Moved Android PNG processing into Gradle and fixed PNG crunching for generated update assets.
- Improved recovery when applying a differential bundle fails.

### 2.0.0 — November 19, 2025

- Introduced the 2.x SDK line and the first differential-update implementation for iOS and Android.
- Added generation and native handling of bundle, asset, and resource metadata required by differential updates.
- Added React Native 0.81 compatibility.
- Switched SDK network requests and native integration from the legacy CodePush service to Revopush.

> Versions 2.1.0 through 2.4.0 only appeared as release candidates during 2.5.0 development and did not contain separate stable release changes.

## SDK 1.x

### 1.6.0 — May 18, 2026

- Added React Native 0.83 support to the 1.x maintenance line.

### 1.5.1 — February 20, 2026

- Added the `ignoreFailedUpdates` sync option, allowing an update to be installed even when it was previously marked as failed.
- Fixed React host delegate integration for React Native versions earlier than 0.81.

### 1.5.0 — November 2, 2025

- Added Android support for React Native 0.81.
- Updated Android ProGuard rules for release builds.

### 1.4.0 — September 22, 2025

- Fixed a native-module name collision in applications containing another CodePush-compatible module.

### 1.3.0 — August 21, 2025

- Added Android support for loading Expo-generated bundles.

### 1.2.0 — June 21, 2025

- Replaced React Native's internal `ChoreographerCompat` dependency with the Android platform `Choreographer`, improving compatibility with newer React Native versions.

### 1.1.0 — April 13, 2025

- Fixed Android ProGuard rules so the SDK works correctly in minified release builds.

### 1.0.0 — March 3, 2025

- Published the first Revopush SDK release under `@revopush/react-native-code-push`.
- Made the Revopush API the default update server and updated the bundled commands and documentation for the Revopush CLI.
- Removed the unsupported Windows implementation from the Revopush package.

## Expo config plugin

The Expo plugin is published separately as `@revopush/expo-code-push-plugin`. It is required for Expo projects because the Revopush SDK needs native configuration and cannot run in Expo Go.

### 1.1.0 — May 18, 2026

- Added Expo SDK 55 support for projects using Revopush SDK 1.6.0 or later.
- Added support for Expo's newer Kotlin `getDefaultReactHost` application template.
- Added Objective-C AppDelegate support alongside the existing Swift integration.
- Added the optional `CodePushPublicKey` setting on iOS and Android for signed OTA updates.
- Updated locked dependencies and forced a patched `uuid` version to address security vulnerabilities.

### 1.0.1 — August 21, 2025

- Published the plugin under the final `@revopush/expo-code-push-plugin` package name.
- Added installation, Expo config, prebuild, and compatibility documentation.

### 1.0.0 — August 19, 2025

- Introduced the Revopush Expo config plugin for Expo SDK 52 and newer.
- Added automatic iOS and Android native configuration for deployment keys and custom Revopush server URLs.
- Added the native project changes required to load the Revopush bundle after `expo prebuild`.
