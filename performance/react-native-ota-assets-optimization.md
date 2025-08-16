# Assets Optimization for Revopush OTA

Over-the-Air (OTA) updates are an excellent way to deliver updates and bug fixes to mobile app users much faster than going through app store review processes.

At Revopush, we put significant effort into making this process as fast and efficient as possible, from using the fastest and most distributed CDNs to calculating asset diffs so that we only deliver changed files.

However, not everything can be optimized on our side. After analyzing thousands of bundles, we’ve found that many developers overlook resource and bundle size optimization.

This oversight can negatively impact both delivery speed and the application’s performance on first launch.

That’s why we’ve put together this guide covering the best practices for reducing React Native bundle size, so you can provide the best possible experience for your users.

![React Native OTA analytics](/images/performance/ota-assets-analytics.png)

Our analysis shows that, on average, fewer than 10% of bundles on our platform are optimized and come in under 5 MB.

Around 50% of bundles weigh in between 10–20 MB, but we’ve also seen “champions” exceeding 80 MB.

Bundles of that size significantly reduce the chances of successful download over slow mobile networks and can cause slower cold starts, especially on low-end Android devices.

Let’s go through how to fix that.

A React Native bundle consists of JS code and assets (images, fonts, videos).

## Image Optimization

Images can account for up to **80%** of a bundle’s total size, so their optimization should be treated with high priority.

The most common image formats are PNG, JPEG, and SVG.

Modern lossy compression algorithms can reduce image sizes by up to 90% with no perceptible quality loss for the end user.

For example, the chart screenshot shown above was compressed by 82% without any visible degradation.

![PNG optimization example](/images/performance/png-optimization-example.png)

To automate image optimization in a React Native application, we recommend the following tools:

- [react-native-imagemin-asset-plugin](https://github.com/iChengbo/react-native-imagemin-asset-plugin) - a Metro Asset plugin for compressing images in React Native. Supports minifying PNG, JPG, and JPEG files or converting them to WEBP using imagemin.
- [imagemin-cli](https://github.com/imagemin/imagemin-cli) - can be integrated directly into your build pipeline for flexible image compression workflows.
- [SVGO](https://svgo.dev/) - a must-have for lossless SVG optimization (especially if you use react-native-svg). It has a CLI and is easy to integrate into pre-commit hooks or CI pipelines. We also recommend [the article](https://blog.swmansion.com/you-might-not-need-react-native-svg-b5c65646d01f) from the react-native-svg maintainers, where they suggest using SVGs only in very specific cases.
- [gifsicle](https://www.lcdf.org/gifsicle/man.html)- significantly reduces GIF sizes, including animated ones.

::: warning
Avoid embedding images or other resources directly into the bundle (e.g., using **data:image** URIs), as this unnecessarily increases JS bundle size.
:::

### Additional Recommendations for React Native Images

React Native documentation recommends to use next image assets structure:

![1x react native documentation](/images/performance/1x-images-documentation.png)

However, most modern devices do not use `@1x` image assets, so removing them will not affect your users. For example, [TotallyMoney](https://medium.com/creating-totallymoney/stop-bundling-images-no-one-uses-38e39f4666a8) reduced their bundle size by 12% simply by removing `@1x` images after analyzing their user base and confirming that none of their devices required that resolution.

## JS Optimization

The React Native JS bundle contains all the JavaScript code you’ve written, along with all dependent modules, compiled into a single optimized file by the [Metro bundler](https://metrobundler.dev/).

Modern versions of React Native use [HermesJS](https://reactnative.dev/docs/hermes), a JavaScript engine optimized for mobile devices. We strongly recommend using HermesJS bundles for optimal performance and reduced size.

#### Avoid including source files

Avoid including `.map` files in your release bundles. They significantly increase bundle size and may create security risks by exposing your source code (unlike Hermes bytecode, which can be decompiled but is far harder to reconstruct into functional JavaScript).

Usually, `.map` files appear when integrating with Sentry. If you are using Sentry, please [read the instructions](/cicd/sentry) on how to correctly generate sourcemaps and prevent them from being included in the OTA bundle.

#### Analyze bundle contents

For example, [react-native-bundle-discovery](https://github.com/retyui/react-native-bundle-discovery) allows you to generate a detailed visualization of your bundle and all its dependencies.

This will help you identify heavy libraries, unnecessary imports, and inlined resources.

![react native bundle discovery](/images/performance/react-native-bundle-discovery.png)

Additionally, use CLI tools such as [Knip](https://knip.dev/) to detect and remove unused code and dependencies.

## Font and Localization Optimization

One of the most common mistakes is storing JSON localization files directly inside the bundle. This unnecessarily inflates bundle size and prevents optimizations where only changed resources are delivered to the device.

A detailed guide on how to implement proper localization handling for Android can be found here:
[99% of React Native Apps Make This Localization (i18n) Mistake — Is Yours One of Them?](https://dev.to/retyui/99-of-react-native-apps-make-this-localization-i18n-mistake-is-yours-one-of-them-2o6g)

Custom fonts may also contain many unused characters. Using the [Fontmin](https://github.com/ecomfe/fontmin) library, you can generate a font file containing only the characters actually used in your application.
