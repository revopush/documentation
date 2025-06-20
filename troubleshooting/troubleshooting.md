# Revopush troubleshooting

Here you can find common problem which user faced during Revopush service integration

## App doesn't detect any update

- You provided wrong deployment key, check proper key for your application inside the dashboard or using CLI
- Your release is not mandatory. Go to dashboard and make release mandatory or use [CLI patch command](/cli/patching-update-metadata#mandatory-parameter)
- Binary version is different from version on mobile. Read more how to [target proper binary version](/cli/releasing-updates#target-binary-version-parameter)

## White or black screen after update

- Check binary version of your release and mobile
- Check that you send proper bundle for specific platform

```shell
revopush release-react <APPLICATION_NAME> android -d <DEPLOYMENT_NAME> --mandatory
revopush release-react <APPLICATION_NAME> ios -d <DEPLOYMENT_NAME> --mandatory
```

If you're still experiencing an error, try to setup new application with specific version of React Native and Revopush SDK [following this instruction](/troubleshooting/application-template) and share logs with us.

## Failed installations on recent releases

With Revopush you can't detect reason of fail. You need to catch these errors on your side using Sentry or other error handling services.

## SDK Troubleshooting

```c++
[!] CocoaPods could not find compatible versions for pod "CodePush":
  In Podfile:
    CodePush (from `../node_modules/@revopush/react-native-code-push`)

Specs satisfying the `CodePush (from `../node_modules/@revopush/react-native-code-push`)` dependency were found, but they required a higher minimum deployment target.
```

To fix it specify min ios target version in your application pod file:

```c++
platform :ios, min_ios_version_supported // [!code --]
platform :ios, '15.5' // [!code ++]
```

## Unexpectedly large bundle sizes

Check if source maps or debug symbols are included. Exclude maps in production

```shell
--entry-file index.js --dev false --minify true
```

## Sentry integration

You can use [Sentry CodePush plugin](https://docs.sentry.io/platforms/react-native/sourcemaps/uploading/codepush/)

```shell
npx sentry-cli releases files <release> upload-sourcemaps ./build --rewrite
```





