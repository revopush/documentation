# Deployment Management

From the CodePush perspective, an app is simply a named grouping for one or more things called "deployments". While the app represents a conceptual "namespace" or "scope" for a platform-specific version of an app (e.g. the iOS port of Foo app), its deployments represent the actual target for releasing updates (for developers) and synchronizing updates (for end-users). Deployments allow you to have multiple "environments" for each app in-flight at any given time, and help model the reality that apps typically move from a dev's personal environment to a testing/QA/staging environment, before finally making their way into production.

::: warning
_NOTE: As you'll see below, the `release`, `promote` and `rollback` commands require both an app name and a deployment name is order to work, because it is the combination of the two that uniquely identifies a point of distribution (e.g. I want to release an update of my iOS app to my beta testers)._
:::

Whenever an app is registered with the CodePush service, it includes two deployments by default: `Staging` and `Production`. This allows you to immediately begin releasing updates to an internal environment, where you can thoroughly test each update before pushing them out to your end-users. This workflow is critical for ensuring your releases are ready for mass-consumption, and is a practice that has been established in the web for a long time.

If having a staging and production version of your app is enough to meet your needs, then you don't need to do anything else. However, if you want an alpha, dev, etc. deployment, you can easily create them using the following command:

```shell
revopush deployment add <appName> <deploymentName>
```

If you want to re-use an existing deployment key, you can do this with:

```shell
revopush deployment add <appName> <deploymentName> -k <existing-deployment-key>
```

::: warning
_NOTE: The deployment key must be 10–100 characters long and can only contain letters, numbers, hyphens (-), and underscores (\_\)._
:::

Just like with apps, you can remove and rename deployments as well, using the following commands respectively:

```shell
revopush deployment rm <appName> <deploymentName>
revopush deployment rename <appName> <deploymentName> <newDeploymentName>
```

<a id="cli-deployment-management-deploy-ls"></a>


If at any time you'd like to view the list of deployments that a specific app includes, you can simply run the following command:

```shell
revopush deployment ls <appName> [--displayKeys|-k]
```

This will display not only the list of deployments, but also the update metadata (e.g. mandatory, description) and installation metrics for their latest release:

![Deployment list](/images/cli/7730991c-c127-11e5-9196-98e9ceec758f.png)

_NOTE: Due to their infrequent use and needed screen real estate, deployment keys aren't displayed by default. If you need to view them, simply make sure to pass the `-k` flag to the `deployment ls` command._

The install metrics have the following meaning:

- **Active** - The number of successful installs that are currently running this release (i.e. if the user opened your app, they would see/run this version). This number will increase and decrease as end-users upgrade to and away from this release, respectively. This metric shows both the total of active users, as well as what percentage of your overall audience that represents. This makes it easy to determine the distribution of updates that your users are currently running, as well as answer questions such as "How many of my users have received my latest update?".

- **Total** - The total number of successful installations that this update has received overall. This number only ever increases as new users/devices install it, and therefore, this is always a superset of the total active count. An update is considered successful once `notifyApplicationReady` (or `sync`) is called after it was installed. Between the moment that an update is downloaded, and it is marked as being successful, it will be reported as a "pending" update (see below for details).

- **Pending** - The number of times this release has been downloaded, but not yet installed (i.e. the app was restarted to apply the changes). Therefore, this metric increases as updates are downloaded, and decreases as those corresponding downloaded updates are installed. This metric primarily applies to updates that aren't configured to install immediately, and helps provide the broader picture of release adoption for apps that rely on app resume and/or restart to apply an update (e.g. I want to rollback an update and I'm curious if anyone has downloaded it yet). If you've configured updates to install immediately, and are still seeing pending updates being reported, then it's likely that you're not calling `notifyApplicationReady` (or `sync`) on app start, which is the method that initiates sending install reports and marks installed updates as being considered successful.

- **Rollbacks** - The number of times that this release has been automatically rolled back on the client. Ideally this number should be zero, and in that case, this metric isn't even shown. However, if you released an update that includes a crash as part of the installation process, the CodePush plugin will roll the end-user back to the previous release, and report that issue back to the server. This allows your end-users to remain unblocked in the event of broken releases, and by being able to see this telemetry in the CLI, you can identify erroneous releases and respond to them by [rolling it back](#rolling-back-undesired-updates) on the server.

- **Rollout** - Indicates the percentage of users that are eligible to receive this update. This property will only be displayed for releases that represent an "active" rollout, and therefore, have a rollout percentage that is less than 100%. Additionally, since a deployment can only have one active rollout at any given time, this label would only be present on the latest release within a deployment.

- **Disabled** - Indicates whether the release has been marked as disabled or not, and therefore, is downloadable by end users. This property will only be displayed for releases that are actually disabled.

When the metrics cell reports `No installs recorded`, that indicates that the server hasn't seen any activity for this release. This could either be because it precluded the plugin versions that included telemetry support, or no end-users have synchronized with the CodePush server yet. As soon as an install happens, you will begin to see metrics populate in the CLI for the release.
