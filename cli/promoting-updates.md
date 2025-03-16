# Promoting Updates

Once you've tested an update against a specific deployment (e.g. `Staging`), and you want to promote it "downstream" (e.g. dev->staging, staging->production), you can simply use the following command to copy the release from one deployment to another:

```shell
revopush promote <appName> <sourceDeploymentName> <destDeploymentName>
[--description <description>]
[--label <label>]
[--disabled <disabled>]
[--mandatory]
[--noDuplicateReleaseError]
[--rollout <rolloutPercentage>]
[--targetBinaryVersion <targetBinaryVersion]
```

The `promote` command will create a new release for the destination deployment, which includes the **exact code and metadata** (description, mandatory and target binary version) from the latest release of the source deployment. While you could use the `release` command to "manually" migrate an update from one environment to another, the `promote` command has the following benefits:

1. It's quicker, since you don't need to reassemble the release assets you want to publish or remember the description/app store version that are associated with the source deployment's release.

2. It's less error-prone, since the promote operation ensures that the exact thing that you already tested in the source deployment (e.g. `Staging`) will become active in the destination deployment (e.g. `Production`).

We recommend that all users take advantage of the automatically created `Staging` and `Production` environments, and do all releases directly to `Staging`, and then perform a `promote` from `Staging` to `Production` after performing the appropriate testing.

## Description parameter

This is the same parameter as the one described in the [above section](#description-parameter), and simply allows you to override the description that will be used for the promoted release. If unspecified, the new release will inherit the description from the release being promoted.

## Label parameter

This optional parameter allows you to pick the specified label from the source deployment and promote it to the destination deployment. If unspecified, the latest release on the source deployment will be promoted.

## Disabled parameter

This is the same parameter as the one described in the [above section](#disabled-parameter), and simply allows you to override the value of the disabled flag that will be used for the promoted release. If unspecified, the new release will inherit the disabled property from the release being promoted.

## Mandatory parameter

This is the same parameter as the one described in the [above section](#mandatory-parameter), and simply allows you to override the mandatory flag that will be used for the promoted release. If unspecified, the new release will inherit the mandatory property from the release being promoted.

## No duplicate release error parameter

This is the same parameter as the one described in the [above section](#no-duplicate-release-error-parameter).

## Rollout parameter

This is the same parameter as the one described in the [above section](#rollout-parameter), and allows you to specify whether the newly created release should only be made available to a portion of your users. Unlike the other release metadata parameters (e.g. `description`), the `rollout` of a release is not carried over/inherited as part of a promote, and therefore, you need to explicitly set this if you don't want the newly created release to be available to all of your users.

## Target binary version parameter

This is the same parameter as the one described in the [above section](#target-binary-version-parameter), and simply allows you to override the target binary version that will be used for the promoted release. If unspecified, the new release will inherit the target binary version property from the release being promoted.

```shell
# Promote the release to production and make it
# available to all versions using that deployment
revopush promote MyApp-iOS Staging Production -t "*"
```
