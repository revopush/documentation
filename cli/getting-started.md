# Revopush CLI guide

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

If at any time you want to determine if you're already logged in, you can run the following command to display the e-mail address associated with your current authentication session, which identity providers your account is linked to (e.g. GitHub):

```shell
revopush whoami
```

When you login from the CLI, your access key is persisted to disk for the duration of your session so that you don't have to login every time you attempt to access your account. In order to end your session and delete this access key, simply run the following command:

```shell
revopush logout
```

If you forget to logout from a machine you'd prefer not to leave a running session on (e.g. your friend's laptop), you can use the following commands to list and remove any current login sessions.

```shell
revopush session ls
revopush session rm <machineName>
```
