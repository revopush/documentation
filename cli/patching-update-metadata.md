# Patching Update Metadata

After releasing an update, there may be scenarios where you need to modify one or more of the metadata attributes associated with it (e.g. you forgot to mark a critical bug fix as mandatory, you want to increase the rollout percentage of an update). You can easily do this by running the following command:

```shell
revopush patch <appName> <deploymentName>
[--label <releaseLabel>]
[--mandatory <isMandatory>]
[--description <description>]
[--rollout <rolloutPercentage>]
[--disabled <isDisabled>]
[--targetBinaryVersion <targetBinaryVersion>]
```

_NOTE: This command doesn't allow modifying the actual update contents of a release. If you need to respond to a release that has been identified as being broken, you should use the [rollback](#rolling-back-updates) command to immediately roll it back, and then if necessary, release a new update with the approrpriate fix when it is available._

Aside from the `appName` and `deploymentName`, all parameters are optional, and therefore, you can use this command to update just a single attribute or all of them at once. Calling the `patch` command without specifying any attribute flag will result in a no-op.

```shell
# Mark the latest production release as mandatory
revopush patch MyApp-iOS Production -m

# Increase the rollout for v23 to 50%
revopush patch MyApp-iOS Production -l v23 -rollout 50%
```

## Label parameter

Indicates which release (e.g. `v23`) you want to update within the specified deployment. If ommitted, the requested changes will be applied to the latest release in the specified deployment. In order to look up the label for the release you want to update, you can run the `revopush deployment history` command and refer to the `Label` column.

_NOTE: This parameter can be set using either `--label` or `-l`_

## Mandatory parameter

This is the same parameter as the one described in the [above section](#mandatory-parameter), and simply allows you to update whether the release should be considered mandatory or not. Note that `--mandatory` and `--mandatory true` are equivalent, but the absence of this flag is not equivalent to `--mandatory false`. Therefore, if the parameter is ommitted, no change will be made to the value of the target release's mandatory property. You need to set this to `--mandatory false` to explicitly make a release optional.

## Description parameter

This is the same parameter as the one described in the [above section](#description-parameter), and simply allows you to update the description associated with the release (e.g. you made a typo when releasing, or you forgot to add a description at all). If this parameter is ommitted, no change will be made to the value of the target release's description property.

## Disabled parameter

This is the same parameter as the one described in the [above section](#disabled-parameter), and simply allows you to update whether the release should be disabled or not. Note that `--disabled` and `--disabled true` are equivalent, but the absence of this flag is not equivalent to `--disabled false`. Therefore, if the parameter is ommitted, no change will be made to the value of the target release's disabled property. You need to set this to `--disabled false` to explicitly make a release acquirable if it was previously disabled.

## Rollout parameter

This is the same parameter as the one described in the [above section](#rollout-parameter), and simply allows you to increase the rollout percentage of the target release. This parameter can only be set to an integer whose value is greater than the current rollout value. Additionally, if you want to "complete" the rollout, and therefore, make the release available to everyone, you can simply set this parameter to `--rollout 100`. If this parameter is ommitted, no change will be made to the value of the target release's rollout parameter.

Additionally, as mentioned above, when you release an update without a rollout value, it is treated equivalently to setting the rollout to `100`. Therefore, if you released an update without a rollout, you cannot change the rollout property of it via the `patch` command since that would be considered lowering the rollout percentage.

## Target binary version parameter

This is the same parameter as the one described in the [above section](#target-binary-version-parameter), and simply allows you to update the semver range that indicates which binary version(s) a release is compatible with. This can be useful if you made a mistake when originally releasing an update (e.g. you specified `1.0.0` but meant `1.1.0`) or you want to increase or decrease the version range that a release supports (e.g. you discovered that a release doesn't work with `1.1.2` after all). If this parameter is ommitted, no change will be made to the value of the target release's version property.

```shell
# Add a "max binary version" to an existing release
# by scoping its eligibility to users running >= 1.0.5
revopush patch MyApp-iOS Staging -t "1.0.0 - 1.0.5"
```
