# App Collaboration

If you will be working with other developers on the same CodePush app, you can add them as collaborators using the following command:

```shell
revopush collaborator add <appName> <collaboratorEmail>
```

::: warning
_NOTE: This expects the developer to have already [registered](/cli/getting-started) with Revopush using the specified e-mail address, so ensure that they have done that before attempting to share the app with them._
:::

Once added, all collaborators will immediately have the following permissions with regards to the newly shared app:

1. View the app, its collaborators, [deployments](/cli/deployment-management) and [release history](/cli/release-history)
1. [Release](/cli/releasing-updates) updates to any of the app's deployments
1. [Promote](/cli/promoting-updates) an update between any of the app's deployments
1. [Rollback](/cli/rolling-back-updates) any of the app's deployments
1. [Patch](/cli/patching-update-metadata) any releases within any of the app's deployments

Inversely, that means that an app collaborator cannot do any of the following:

1. Rename or delete the app
2. Transfer ownership of the app
3. Create, rename or delete new deployments within the app
4. Clear a deployment's release history
5. Add or remove collaborators from the app (\*)

::: warning
_NOTE: A developer can remove him/herself as a collaborator from an app that was shared with them._
:::

Over time, if someone is no longer working on an app with you, you can remove them as a collaborator using the following command:

```shell
revopush collaborator rm <appName> <collaboratorEmail>
```

If at any time you want to list all collaborators that have been added to an app, you can simply run the following command:

```shell
revopush collaborator ls <appName>
```

Finally, if at some point, you (as the app owner) will no longer be working on the app, and you want to transfer it to another developer (or a client), you can run the following command:

```shell
revopush app transfer <appName> <newOwnerEmail>
```

::: warning
_NOTE: Just like with the `revopush collaborator add` command, this expects that the new owner has already registered with CodePush using the specified e-mail address._
:::

Once confirmed, the specified developer becomes the app's owner and immediately receives the permissions associated with that role. Besides the transfer of ownership, nothing else about the app is modified (e.g. deployments, release history, collaborators). This means that you will still be a collaborator of the app, and therefore, if you want to remove yourself, you simply need to run the `revopush collaborator rm` command after successfully transferring ownership.
