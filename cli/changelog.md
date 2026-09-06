# CLI changelog

## 0.0.15 — August 26, 2026

- Added release size checks to `release-react` and `release-expo`. Assets over 500 KiB block the release unless `--force` is passed, bundles over 10 MiB trigger a warning recommending diff updates, and bundled source maps prompt Sentry upload guidance.
- A custom `--outputDir` must now end with a folder named `CodePush` so diff updates can locate the base bundle.
- Removed Windows as a `release-react` platform target.

## 0.0.13 — June 15, 2026

- Added support for reading Android versions from Kotlin DSL (`build.gradle.kts`) projects.
- Fixed IPA extraction for archives whose app payload contains extra files or nested paths.

## 0.0.12 — May 18, 2026

- Added native build targeting to releases. The CLI can read iOS `CFBundleVersion` and Android `versionCode`, and pass a build number when creating React Native, Expo, or native releases.
- Added `--buildNumber` support to `deployment patch`, including the ability to reset a release to all builds.
- Made build-number targeting optional and limited automatic detection to compatible Revopush SDK versions.
- Fixed Hermes discovery in projects that only contain one native platform.

## 0.0.11 — February 7, 2026

- Improved monorepo support by resolving the installed React Native version from `react-native/package.json` instead of relying on a project-relative Hermes path.

## 0.0.10 — February 2, 2026

- Fixed iOS plist parsing when extracting release metadata.

## 0.0.9 — January 30, 2026

- Added Android App Bundle (`.aab`) support to `release-native`.

## 0.0.8 — January 15, 2026

- Added `release-expo` for building and publishing Expo updates.
- Added `release-native` for publishing existing iOS IPA and Android APK artifacts, with automatic native-version detection.
- Added React Native 0.83 support.
- Added base Hermes bytecode metadata used by differential updates.
- Added `--initialRelease` for creating an app's first release.
- Added `--force` to `deployment rm` for non-interactive deletion.
- Fixed the logout help text.

## 0.0.7 — August 28, 2025

- Fixed module imports in the release command after the Hermes and source-map changes.

## 0.0.6 — August 28, 2025

- Fixed release metrics handling.

## 0.0.5 — August 28, 2025

- Added automatic Hermes detection for React Native projects.
- Added platform-specific Hermes compilation and source-map output handling for iOS and Android.
- Standardized generated source maps as `CodePushSourceMap` and corrected Metro/Hermes source-map arguments.
- Improved `node_modules` discovery, including projects where dependencies are not in the default location.

## 0.0.4 — April 8, 2025

- Added `--extraBundlerOption` to `release-react`, allowing additional arguments to be forwarded to the React Native bundler.
