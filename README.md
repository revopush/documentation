# Revopush Documentation

VitePress documentation site for [Revopush](https://revopush.org) — the cloud alternative to React Native CodePush.

## Requirements

- Node.js >= 22
- pnpm >= 10

## Install

```shell
pnpm install
```

## Dev server

```shell
pnpm docs:dev
```

## Production build

```shell
pnpm docs:build
```

## Deployment

Merging to `main` automatically deploys to [Cloudflare Pages](https://pages.cloudflare.com) via GitHub Actions.

The following secrets must be set in the repository settings:

| Secret | Description |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages Edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |

test preview
