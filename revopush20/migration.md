# Revopush 2.0 Migration guide

This guide will help you to migrate from Revopush 1.x to 2.0. If you have not used Revopush yet,
please refer user [guide](/revopush20/getting-started).

## Configure CLI

To get all the benefits of Revopush 2.0 you need to use the latest version of CLI (`0.0.9` and above). If you had one installed you can upgrade it

```shell
npm upgrade -g @revopush/code-push-cli
```

or in case of CI/CD you need to install it 
```shell
npm install -g @revopush/code-push-cli@0.0.9
```

Ensure `revopush -v` is `0.0.9` and above
```shell
revopush -v
0.0.9
```

## Configure Revopush SDK
Your app needs to use Revopush SDK `2.5.0-rc.2` and above. To update version of Revopush SDK in the root folder of the app execute

```shell
npm install @revopush/react-native-code-push@2.5.0-rc.2
```

<!--@include: ./parts/base-release.md-->

<!--@include: ./parts/regular-release.md-->
