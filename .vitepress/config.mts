import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Revopush",
  description: "The Ultimate Alternative to CodePush",
    head: [
        ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Dashboard', link: 'https://app.revopush.org/' },
      { text: 'Blog', link: 'https://revopush.org/' }
    ],
    logo: '/logo.svg',
    search: {
        provider: 'local'
    },

    sidebar: [
      {
        text: 'Introduction',
        collapsed: true,
        items: [
          { text: 'What is Revopush?', link: '/' },
          { text: 'Getting started', link: '/intro/getting-started' }
        ]
      },
        {
            text: 'Revopush CLI',
            collapsed: true,
            items: [
                { text: 'Getting started', link: '/cli/getting-started' },
                { text: 'App management', link: '/cli/app-management' },
                { text: 'App Collaboration', link: '/cli/app-collaboration' },
                { text: 'Deployment management', link: '/cli/deployment-management' },
                { text: 'Releasing Updates', link: '/cli/releasing-updates' },
                { text: 'Patching Update Metadata', link: '/cli/patching-update-metadata' },
                { text: 'Promoting Updates', link: '/cli/promoting-updates' },
                { text: 'Rolling Back Updates', link: '/cli/rolling-back-updates' },
                { text: 'Release History', link: '/cli/release-history' },
                { text: 'Code Signing', link: '/cli/code-signing' },
            ]
        },
        {
            text: 'React Native SDK',
            collapsed: true,
            items: [
                { text: 'Getting started', link: '/sdk/getting-started' },
                { text: 'iOS Setup', link: '/sdk/ios' },
                { text: 'Android Setup', link: '/sdk/android' },
                { text: 'Java Script API', link: '/sdk/api-js' },
                { text: 'Android API', link: '/sdk/api-android' },
                { text: 'iOS API', link: '/sdk/api-ios' },
                { text: 'Multi-Deployment Testing iOS', link: '/sdk/multi-deployment-testing-ios' },
                { text: 'Multi-Deployment Testing Android', link: '/sdk/multi-deployment-testing-android' },
            ]
        },
        {
            text: 'Appcenter Migration',
            collapsed: true,
            items: [
                { text: 'Step by step guide', link: '/migration/guide' },
            ]
        },
        {
            text: 'CI/CD integration',
            collapsed: true,
            items: [
                { text: 'Github Actions', link: '/cicd/github-action' },
                { text: 'Bitrise', link: '/cicd/bitrise' },
                { text: 'CircleCI', link: '/cicd/circleci' },
            ]
        }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
