#### Regular release

```shell
revopush release-react <APPLICATION_NAME> ios -d <DEPLOYMENT_NAME>
```

```shell
revopush release-react <APPLICATION_NAME> android -d <DEPLOYMENT_NAME>
```

::: warning
To properly calculate diff updates when using `-o` or `--outputDir` parameter, the output directory must end with **CodePush**.

For example:

```shell
revopush release-react <APPLICATION_NAME> android -d <DEPLOYMENT_NAME> -o ./build/CodePush
```
:::

Read more about Releases in [Releasing updates guide](/cli/releasing-updates)
