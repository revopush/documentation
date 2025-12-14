# Integrate Revopush OTA with Expo

This guide will help you to set up your Expo project and make first Revopush release.

## Create an application

1. Go to [Applications](https://app.revopush.org/applications) and add an application

![Add new application](/images/intro/add-new-app.png)

2. Enter application name and save it

![Add new application modal](/images/intro/add-new-app-modal.png)

3. As a result, you will see your application in the list with two deployments available out of the box

![Application list](/images/intro/add-new-app-list.png)

## Setup Revopush SDK

Revopush SDK doesn't work with Expo Go because it requires native code changes.

| Expo SDK  | Revopush SDK | Revopush Expo plugin |
|-----------|--------------|----------------------|
| 52+       | 1.3.0        | 1.0.0                |

#### Install Revopush SDK

```bash
npx expo install @revopush/react-native-code-push
```

#### Install Revopush Expo plugin

```bash
npx expo install @revopush/expo-code-push-plugin
```

#### Setup Expo config plugin

If you don't have, add [Expo dynamic config](https://docs.expo.dev/workflow/configuration/#dynamic-configuration) to your project

Go to app settings to get Deployment keys:

![Application deployments](/images/intro/deployments-list.png)

Extend Plugin section in your Expo config with:

**App.json**

```json
{
  "plugins": [
    ["@revopush/expo-code-push-plugin", {   // [!code ++]
              "ios": {  // [!code ++]
                "CodePushDeploymentKey": "YOUR_DEPLOYMENT_KEY",   // [!code ++]
                "CodePushServerUrl": "https://api.revopush.org"   // [!code ++]
              }, // [!code ++]
              "android": { // [!code ++]
                "CodePushDeploymentKey": "YOUR_DEPLOYMENT_KEY", // [!code ++]
                "CodePushServerUrl": "https://api.revopush.org" // [!code ++]
              } // [!code ++]
          } // [!code ++]
        ] // [!code ++]
    ]
}
```

**app.config.js**

```typescript
module.exports = ({ config }: { config: ExpoConfig }) => ({
    ...config,
    plugins: [
        ["@revopush/expo-code-push-plugin", {   // [!code ++]
            ios: {  // [!code ++]
                CodePushDeploymentKey: 'YOUR_DEPLOYMENT_KEY',   // [!code ++]
                CodePushServerUrl: 'https://api.revopush.org'   // [!code ++]
            }, // [!code ++]
            android: { // [!code ++]
                CodePushDeploymentKey: 'YOUR_DEPLOYMENT_KEY', // [!code ++]
                CodePushServerUrl: 'https://api.revopush.org' // [!code ++]
            } // [!code ++]
        }] // [!code ++]
    ],
});
```

Run prebuild command to generate native ios and android folders

```bash
npx expo prebuild --clean
```

::: warning
If you faced with ios target version error, add [expo-build-properties](https://docs.expo.dev/versions/latest/sdk/build-properties/) plugin and set ios `deploymentTarget` to 15.5
:::

## JS configuration

Configure the SDK in the JavaScript layer of your expo app (minimal setup):

```js
import codePush from "@revopush/react-native-code-push"; // [!code ++]

function RootLayout() {}

export default codePush(RootLayout); // [!code ++]
```

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

Release process contains from 2 steps: generating bundle and releasing it to Revopush.

### Android

Run [expo export](https://docs.expo.dev/more/expo-cli/#exporting) command to generate production HermesJS bundle and assets:

```bash
npx expo export:embed \
  --platform android \
  --dev false \
  --reset-cache \
  --bundle-output ./build-android/index.android.bundle \
  --assets-dest ./build-android \
  --bytecode 
```

To release this bundle run:

```bash
revopush release <APP_NAME> ./build-android <TARGET_VERSION> -d <APP_ENVIRONMENT> --mandatory
```

### iOS

Run [expo export](https://docs.expo.dev/more/expo-cli/#exporting) command to generate production HermesJS bundle and assets:

```bash
npx expo export:embed \
  --platform ios \
  --dev false \
  --reset-cache \
  --bundle-output ./build-ios/main.jsbundle \
  --assets-dest ./build-ios \
  --bytecode 
```

To release this bundle run:

```bash
revopush release <APP_NAME> ./build-ios <TARGET_VERSION> -d <APP_ENVIRONMENT> --mandatory
```

## Test locally

To test Revopush on your simulator or device you need to run application in release mode.

For Android:

```bash
npx expo run:android --variant release --no-bundler
```

For iOS:

```bash
npx expo run:ios --configuration Release
```

::: warning
Every time you change Revopush settings inside app config you need to run `npx expo prebuild --clean` to apply these changes on native side
:::

## Troubleshooting

If you see this message in logs:

> The error message: Update is invalid - A JS bundle file named "null" could not be 
>  found within the downloaded contents. Please check that you are releasing your     
> CodePush updates using the exact same JS bundle file name that was shipped with    
> your app's binary.

You will probably need to remove `expo-updates` package.

```bash
npm uninstall expo-updates
```

Then remove `expo-updates` specific app config properties and run `prebuild` to uninstall native `expo-updates` dependencies

```bash
npx expo prebuild --clean
```

