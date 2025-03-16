# App Management

Before you can deploy any updates, you need to register an app with the Revopush service using the following command:

```shell
revopush app add <appName>
```

If your app targets both iOS and Android, please _create separate apps for each platform_ with Revopush (see the note below for details). 
This way, you can manage and release updates to them separately, which in the long run, also tends to make things simpler. 
The naming convention that most folks use is to suffix the app name with `-iOS` and `-Android`. 

For example:

```shell
revopush app add MyApp-Android
revopush app add MyApp-iOS
```

::: warning
_NOTE: Using the same app for iOS and Android may cause installation exceptions because the Revopush update package produced for iOS will have different content from the update produced for Android._
:::

All new apps automatically come with two deployments (`Staging` and `Production`) so that you can begin distributing updates to multiple channels without needing to do anything extra (see deployment instructions below). After you create an app, the CLI will output the deployment keys for the `Staging` and `Production` deployments, 
which you can begin using to configure your mobile clients with the [React Native](https://github.com/revopush/react-native-code-push) SDK.

If you decide that you don't like the name you gave to an app, you can rename it at any time using the following command:

```shell
revopush app rename <appName> <newAppName>
```

The app's name is only meant to be recognizable from the management side, and therefore, you can feel free to rename it as necessary. It won't actually impact the running app, since update queries are made via deployment keys.

If at some point you no longer need an app, you can remove it from the server using the following command:

```shell
revopush app rm <appName>
```

Do this with caution since any apps that have been configured to use it will obviously stop receiving updates.

Finally, if you want to list all apps that you've registered with the Revopush server,
you can run the following command:

```shell
revopush app ls
```

