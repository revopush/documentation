# Sentry Integration 

Sentry's React Native SDK works out of the box with CodePush. Revopush is 100% compatible with CodePush.
To see readable stack traces in the product, you must upload source maps to Sentry. 

This guide explains how to upload source maps for CodePush releases, that are created with the Revopush CLI.

Before you start, make sure that you configured Sentry Environment for your project properly.

## SDK Integration

Ensure CodePush is the outer most function because it needs access to the root component in order to swap out the bundle.

```javascript
export default codePush(Sentry.wrap(App));
```

## Generate sourcemap

To ensure Sentry can symbolicate events from your CodePush releases, you need to generate and upload the necessary assets.

Depending on the JS engine you use, run the following commands.

::: warning
`--sourcemapOutput` must not match `--outputDir` to prevent .map files from being included in your bundle and delivered to clients.
:::

#### JSC (JavaScriptCore)

```bash
revopush release-react \
  "${APP_NAME}" \
  "${PLATFORM}" \
  --deploymentName "${DEPLOYMENT_NAME}" \
  --outputDir ./build \
  --sourcemapOutput ./sourcemap
```

In case of error try to create `sourcemap` folder manually in the root of your project. 

#### Hermes

Install the [jq](https://jqlang.org/) utility. For example, `apt-get install jq` on Ubuntu, or `brew install jq` on macOS with Homebrew.

```bash
rm -rf ./build ./sourcemaps
mkdir -p ./sourcemap

CODEPUSH_COMMAND="revopush release-react \
  \"${APP_NAME}\" \
  \"${PLATFORM}\" \
  --deploymentName \"${DEPLOYMENT_NAME}\" \
  --useHermes \
  --outputDir ./build \
  --sourcemapOutput ./sourcemap"

DEBUG_ID=$(eval "$CODEPUSH_COMMAND" | tee /dev/tty | grep -o 'Bundle Debug ID: [0-9a-f-]*' | sed 's/Bundle Debug ID: //')
MAP_FILE=$(find ./sourcemap -name "*.map" -type f)

jq -c ". + {\"debug_id\": \"${DEBUG_ID}\"}" "${MAP_FILE}" > "${MAP_FILE}.tmp"
mv "${MAP_FILE}.tmp" "${MAP_FILE}"
```

## Upload sourcemap

Upload source maps for your CodePush release by setting up your environment variables and running the [sourcemaps upload](https://docs.sentry.io/cli/releases/#upload-source-maps) command.

Before running the upload command, make sure to set up your environment variables. 

If you’ve already configured Sentry, you can find this data in your project’s Sentry configuration at `ios/sentry.properties` or `android/sentry.properties`.

```bash
export SENTRY_ORG=example-org
export SENTRY_PROJECT=example-project
export SENTRY_AUTH_TOKEN=sntrys_YOUR_TOKEN_HERE
```

To upload source maps for your CodePush release, use the sourcemaps upload command.

```bash
npx sentry-cli sourcemaps upload \
  --debug-id-reference \
  --strip-prefix /path/to/project/root \
  ./build ./sourcemap
```

It will associate `.map` files from `sourcemap` folder with `bundle` from `build`.

Only `.map` files will be uploaded to Sentry.

