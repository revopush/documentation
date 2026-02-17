## Frequently Asked Questions and Best Practices

>_**Q: If a store submission is rejected, and we must rebuild the binary, can we create another base release with the same target version?**_

A: **No. Each base release must have a unique target version.** Even with access to your new APK/IPA file, it is not possible to determine whether the changes are fully compatible with the previous base binary.

Because Revopush generates diff updates at the byte level of the bundle, even small changes — if not handled carefully — may create inconsistencies and result in a full bundle download, which can be slower and more expensive.

----

>**_Q: How should we smoothly promote a release from Staging to Production for a given binary version?_**

A: **You do not need to create a base release again for Production if one already exists in Staging.** Once you have tested and validated all necessary scenarios, you can promote the desired version to Production.

If no base release has yet been created in the Production deployment for that binary version, the promote command will create both the selected release and its corresponding base release automatically.

This approach minimizes the risk of creating a base release from an APK/IPA that differs from the version uploaded to the app stores.

Here is an example of promote command in CLI
```shell
revopush promote <app name> Staging Production --label v33 --disabled --rollot 0
```
Where: <br/>
`Staging` - is a source deployment name <br/>
`Production` - is a destination deployment name <br/>
`--label v33` - label of the source release that will be taken. If omitted, the latest release being promoted will be used. <br/>
`--disabled` -  Specifies whether this release should be immediately downloadable (true/false). <br/>
`--rollot 0` - Percentage of users this update should be immediately available to <br/>

This approach allows you to release to Production at a controlled pace and manage the rollout percentage.

----
> **_Q: Can we add base release creation into our store deployment workflow?_**

A: **Yes — you can absolutely do that.** If you have a fully automated CI/CD release workflow (e.g., using GitHub Actions, Bitrise, CircleCI, or similar), simply embed the `revopush release-native` CLI command into your pipeline.

This minimizes the risk of human error and ensures consistency between the native release uploaded to app stores and the corresponding base release in Revopush.


