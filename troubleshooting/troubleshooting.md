# Revopush troubleshooting

Here you can find common problems which users faced during Revopush service integration

## App doesn't detect any updates

- Wrong deployment key provided or no deployment key at all.Check a proper key for your application inside the dashboard or [using CLI](/cli/deployment-management#cli-deployment-management-deploy-ls)
- Release is not mandatory. Go to dashboard and make release mandatory or use [CLI patch command](/cli/patching-update-metadata#patching-update-metadata)
- Release is disabled. Go to dashboard and enable release or use [CLI patch command](/cli/releasing-updates#disabled-parameter)
- Bundle is targeted to a different store/binary version of the application. Read more how to [target proper binary version](/cli/releasing-updates#target-binary-version-parameter)

## White or black screen after update

- Check a target binary version of [your release](/cli/releasing-updates#target-binary-version-parameter) and mobile
- Check a [target platform](/cli/releasing-updates#platform-parameter) for your release. In general bundles for Android can't be used for iOS and vice versa

```shell
revopush release-react <ANDROID_APPLICATION_NAME> android -d <DEPLOYMENT_NAME> --mandatory
revopush release-react <IOS_APPLICATION_NAME> ios -d <DEPLOYMENT_NAME> --mandatory
```

If you're still experiencing an error, try to set up a new application with a specific version of React Native and Revopush SDK [following this instruction](/troubleshooting/application-template) and share logs with us.
Revopush logs are prefixed by `[CodePush]`.

## Failed installations on recent releases

Revopush mobile SDK neither collect nor aggregate any information about reasons of failed installations.
You need to catch these errors on your side using tools such as Sentry or collect logs from device or emulator if you can replicate the issue.

## SDK Troubleshooting

```c++
[!] CocoaPods could not find compatible versions for pod "CodePush":
  In Podfile:
    CodePush (from `../node_modules/@revopush/react-native-code-push`)

Specs satisfying the `CodePush (from `../node_modules/@revopush/react-native-code-push`)` dependency were found, but they required a higher minimum deployment target.
```

To fix it, specify a min ios target version in your application pod file:

```c++
platform :ios, min_ios_version_supported // [!code --]
platform :ios, '15.5' // [!code ++]
```

## Unexpectedly large bundle sizes

Check if source maps or debug symbols are included. Exclude sourcemaps in production bundles

```shell
--entry-file index.js --dev false --minify true
```

## Sentry integration

You can use [Sentry CodePush plugin](https://docs.sentry.io/platforms/react-native/sourcemaps/uploading/codepush/)

```shell
npx sentry-cli releases files <release> upload-sourcemaps ./build --rewrite
```





