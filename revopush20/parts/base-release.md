## Make a release

To use **Diff updates** together with Revopush SDK 2.0, you must first create a base release for the specific binary version of the app you are targeting.

#### What is a base release?

A base release is a snapshot of your assets and JavaScript bundle exactly as they were shipped to the app stores together with your IPA/APK.

This snapshot is then used as a baseline to generate diffs only for assets and the JS bundle that already exist in the store build and on users’ devices.

As a result, update payload sizes are reduced by 10–20×, and update delivery to users becomes significantly faster.

To create a base release, you first need to build release APK/IPA files for the target platform and then provide these files as CLI parameters to create the base release.

```shell
revopush release-native <APPLICATION_NAME> ios ./path_to_ipa/app.ipa
```

```shell
revopush release-react <APPLICATION_NAME> android ./path_to_ipa/app.apk
```

```shell
revopush release-react <APPLICATION_NAME> android ./path_to_ipa/app.aab
```

Full command specification:

```shell
revopush release-native <appName> <platform> <targetBinary> [options]

Options:
  --help                     Show help  [boolean]
  -d, --deploymentName       Deployment to release the update to  [string] [default: "Staging"]
  -t, --targetBinaryVersion  Semver expression that specifies the binary app version(s) this release is targeting (e.g. 1.1.0, ~1.2.3).  [string] [default: null]
  -v, --version              Show version number  [boolean]
```
