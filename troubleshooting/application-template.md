# Reproducing an Issue with Revopush SDK on a Specific React Native Version

This guide will help you to setup clear React Native application with specific version and configure Revopush SDK.
We expect you already configured your Revopush account before. If no follow [Revopush getting started guide](/intro/getting-started)

## Create CLI application

Create a new project using the React Native CLI. Make sure to use the CLI version compatible with your target RN version [RN CLI Compatibility](https://github.com/react-native-community/cli?tab=readme-ov-file#compatibility)

```bash
npx @react-native-community/cli@15 init rn76 --version 0.76.9
```

Navigate into the project and install the Revopush SDK:

```bash
npm install --save @revopush/react-native-code-push
```

## Configure Revopush SDK

Configure the SDK for your target platform:

### iOS configuration

Go to the  `ios/[ProjectName]/AppDelegate.swift` and replace:

```swift
override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle") // [!code --]
    CodePush.bundleURL() // [!code ++]
#endif
}
```

[Revopush iOS Setup Guide](/sdk/ios)

### Android configuration

Go to the  `android/app/build.gradle` and add:

```kotlin
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"

apply from: "../../node_modules/@revopush/react-native-code-push/android/codepush.gradle" // [!code ++]
```

Then apply changes to MainApplication.kt in the `android/app/src/main/../MainApplication.kt`

```kotlin
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader

import com.microsoft.codepush.react.CodePush // [!code ++]

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {}

        override fun getJSBundleFile(): String { // [!code ++]
            return CodePush.getJSBundleFile()// [!code ++]
        }// [!code ++]

        override fun getJSMainModuleName(): String = "index"
      }
}
```

[Revopush Android Setup Guide](/sdk/android)

After you configure your React Native application go to app settings to get Deployment keys:

![Application deployments](/images/intro/deployments-list.png)

### Setup deployment key for iOS

Add the `CodePushServerURL` and `CodePushDeploymentKey` to the file `ios/[ProjectName]/Info.plist`

```xml
<key>CodePushServerURL</key>
<string>https://api.revopush.org</string>
<key>CodePushDeploymentKey</key>
<string>YOUR_DEPLOYMENT_KEY</string>
```

### Setup deployment key for Android

Add the `CodePushServerUrl` and `CodePushDeploymentKey` to the file `android/app/src/main/res/values/strings.xml`

```xml
<resources>
    <string moduleConfig="true" name="CodePushServerUrl">https://api.revopush.org</string>
    <string moduleConfig="true" name="CodePushDeploymentKey">YOUR_DEPLOYMENT_KEY</string>
</resources>

```

### JS Configuration

Configure the SDK in the JavaScript layer of your app (minimal setup):

```js
import codePush from "@revopush/react-native-code-push";

class MyApp extends Component {}

MyApp = codePush(MyApp);
```

More details: [JS SDK API](/sdk/api-js)

## Setup CLI

Install the Revopush CLI and log in:

```shell
npm install -g @revopush/code-push-cli
revopush login
```

More on CLI setup: [Getting Started with CLI](/cli/getting-started)

Create your app in the Revopush UI or via the CLI and copy the deployment keys into your app configuration.
Enable logging to help identify potential issues: [Debugging & Troubleshooting Guide](/sdk/getting-started#debugging-troubleshooting)

## Run application in release mode

Run the app in Release mode on an emulator or real device:

```shell
npx react-native run-ios --mode Release --no-packager
npx react-native run-android --mode Release --no-packager
```

This ensures the app doesn't rely on the local Metro bundler and uses the deployed update instead.

## Make test release

Release an update using the Revopush CLI:

```shell
revopush release-react <APPLICATION_NAME> android -d <DEPLOYMENT_NAME> --mandatory
revopush release-react <APPLICATION_NAME> ios -d <DEPLOYMENT_NAME> --mandatory
```

More on releasing updates: [Releasing with CLI](/cli/releasing-updates)

Check logs for errors or confirmation of the new release being applied.
