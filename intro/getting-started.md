# Revopush User guide

This 5-minute guide will help you to set up your first Revopush integration

## Create an account

First, you need to create an account at the following service: https://app.revopush.org/register

## Create an application

1. Go to [Applications](https://app.revopush.org/applications) and add an application

![Add new application](/images/intro/add-new-app.png)

2. Enter application name and save it

![Add new application modal](/images/intro/add-new-app-modal.png)

3. As a result, you will see your application in the list with two deployments available out of the box

![Application list](/images/intro/add-new-app-list.png)

## Setup mobile client SDK

First, you need to decide what client SDK to use. We support two options:

- For React Native **<0.76** and old architecture, you should stay on a Microsoft CodePush client SDK. 
[Read here](https://github.com/microsoft/react-native-code-push) how to configure Microsoft CodePush SDK.

- For React Native **>=0.76**, or you need support for New Architecture, you should use Revopush client SDK.
- For Expo SDK 52+ follow [Expo configuration instructions](/intro/expo)

| React Native version(s)            | Supporting CodePush version(s)                                                           |             
|------------------------------------|------------------------------------------------------------------------------------------|
| <v0.76                             | Use old Microsoft [CodePush client](https://github.com/microsoft/react-native-code-push) |
| 0.76, 0.77, 0.78, 0.79, 0.80, 0.81 | Use [Revopush SDK](https://github.com/revopush/react-native-code-push) (Support both New and Old Architectures)                                                                             |

#### For this guide we will use Revopush SDK

Install Revopush client:

```bash
npm install --save @revopush/react-native-code-push
```

#### Setup iOS

Go to the  `ios/[ProjectName]/AppDelegate.swift` and replace:

```swift
import CodePush // [!code ++]

override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle") // [!code --]
    CodePush.bundleURL() // [!code ++]
#endif
}
```

Go to the  `ios/[ProjectName]/AppDelegate.mm` and replace:

```Obj-c
#import <CodePush/CodePush.h> // [!code ++]

- (NSURL *)bundleURL
{
    #if DEBUG
      return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
    #else
      return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"]; // [!code --]
      return [CodePush bundleURL];  // [!code ++]
    #endif
}
```

#### Setup Android

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

## JS configuration

Configure the SDK in the JavaScript layer of your app (minimal setup):

```js
import codePush from "@revopush/react-native-code-push";

class MyApp extends Component {}

MyApp = codePush(MyApp);
```

More details: [JS SDK API](/sdk/api-js)

## Configure CLI

After registration, install the Revopush CLI.

```shell
npm install -g @revopush/code-push-cli
```

Login to Revopush CLI using the following command:

```shell
revopush login
```

This will launch a browser, asking you to authenticate with either your GitHub or Google account.
This will generate an access key that you need to copy/paste into the CLI (it will prompt you for it).
You are now successfully authenticated and can safely close your browser window.

```shell
Opening your browser...
Visit https://app.revopush.org/cli-login?hostname=<YOUR_HOST_NAME> and enter the code

Enter your access key:
```

Read more about [Revopush CLI](/cli/getting-started)

## Make a release

In the root folder of a React Native project, run these commands

```shell
revopush release-react <APPLICATION_NAME> ios -d <DEPLOYMENT_NAME>
```

```shell
revopush release-react <APPLICATION_NAME> android -d <DEPLOYMENT_NAME>
```

Read more about Releases in [Releasing updates guide](/cli/releasing-updates)

## Run application in release mode

If you want to test integration locally run the app in Release mode on an emulator or real device:

```shell
npx react-native run-ios --mode Release --no-packager
npx react-native run-android --mode Release --no-packager
```

This ensures the app doesn't rely on the local Metro bundler and uses the deployed update instead.

