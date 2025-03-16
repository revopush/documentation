# Revopush CLI Circle CI Orb

Provides Revopush CLI commands for release/promote/rollback react-native bundles.

## Commands

* `install` - install Revopush CLI to Circle CI context.


## Prerequisites

Mandatory environment variables:

* `REVOPUSH_ACCESS_KEY` - access key. Suppose to be a secret.

Circle CI execution environment with `node` and `npm` commands (eg `- image: cimg/node:current`).

Example
-------

In this example we will release a react-native bundle for iOS app (`revopush release-react ios_app ios -d Staging`).

```yaml
version: 2.1
orbs:
  revopush: revopush/revopush-circleci-orb@0.0.2
jobs:
  publish-react-native-bundle:
    docker:
      - image: cimg/node:current
    steps:
      - checkout
      - revopush/install
      - run: npm ci
      - run:
          command: revopush release-react ios_app ios -d Staging
          name: Release iOS App
workflows:
  main:
    jobs:
      - publish-react-native-bundle
```

Advanced Settings. We define Revopush CLI version to install (`revopush_cli_version: 0.0.3`).

```yaml
orbs:
  revopush: revopush/revopush-circleci-orb@0.0.2
jobs:
  publish-react-native-bundle:
    docker:
      - image: cimg/node:current
    steps:
      - checkout
      - revopush/install:
          revopush_cli_version: 0.0.3
      - run: npm ci
      - run:
          command: revopush release-react ios_app ios -d Staging
          name: Release iOS App
workflows:
  main:
    jobs:
      - publish-react-native-bundle
```

## Support

For issues [https://github.com/revopush/revopush-circleci-orb/issues](https://github.com/revopush/revopush-circleci-orb/issues)

For questions [support@revopush.org](mailto:support@revopush.org)
