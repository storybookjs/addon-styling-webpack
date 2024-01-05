<div style="margin: 0 auto; text-align: center; padding-bottom: 20px;">
  <img src="https://raw.githubusercontent.com/storybookjs/addon-styling-webpack/3b88daa822e57b7e691cd0b77d70ac5582410f8a/.github/media/styling.svg" alt="addon-styling-webpack Logo" width="150" height="150" align="center">
</div>

# `@storybook/addon-styling-webpack`

Get started in Storybook 7 faster with popular styling tools.

## ✨ Features

- 🤖 Zero-config for popular tools through codemods.
- 🧩 Configuration templates for popular tools
- ⚡️ Options for CSS modules, PostCSS, Sass, Less, and Vanilla-extract

## 🏁 Getting 

### 🤖 Automatic configuration

To get started, **install the package** using the Storybook CLI:

pnpm:

```zsh
pnpm dlx storybook@latest add @storybook/addon-styling-webpack
```

yarn:

```zsh
yarn dlx storybook@latest add @storybook/addon-styling-webpack
```

npm:

```zsh
npx storybook@latest add @storybook/addon-styling-webpack
```

**What does this do?**
Under the hood, this installs the package in your project and adds the addon to your `main.js` file.
After that, it will run `npx @storybook/auto-config styling`. This is a codemod package that will attempt to detect the styling tools in your project and configure your storybook accordingly.

If the codemod fails, please try running `npx @storybook/auto-config styling` manually. If that fails, please [file an issue in the auto-config repo](https://github.com/storybookjs/auto-config/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D).

### 🛠️ Manual configuration

`@storybook/addon-styling-webpack` takes Webpack module rules for your styling tools and replaces the existing rules in Storybook's Webpack config. This avoids duplicating rules that will break your Storybook build.

```js
{
  name: '@storybook/addon-styling-webpack',
  options: {
    rules: [
      // Replaces existing CSS rules with given rule
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }
    ]
  }
}
```

It can also take Webpack plugins to add to the Storybook config.

```js
{
  name: '@storybook/addon-styling-webpack',
  options: {
    plugins: [
      new MiniCssExtractPlugin(),
    ]
  }
}
```

### 🧩 Popular Configurations
Below are a few popular configurations for common styling tools to get you started. More complex configurations are possible by combining the different rules below.

#### PostCSS
```js
// Often used for tailwind
{
  name: '@storybook/addon-styling-webpack',
  options: {
    rules: [
      // Replaces existing CSS rules to support PostCSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            // Gets options from `postcss.config.js` in your project root
            loader: 'postcss-loader',
            options: { implementation: require.resolve('postcss') }
          }
        ],
      }
    ]
  }
}
```

You can also take a look at this [example project](https://stackblitz.com/edit/github-5njuww?file=.storybook%2Fmain.ts) that uses PostCSS for **Tailwind** with Storybook:

#### CSS Modules
```js
{
  name: '@storybook/addon-styling-webpack',
  options: {
    rules: [
      // Replaces existing CSS rules to support CSS Modules
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          }
        ],
      }
    ]
  }
}
```

#### Sass
```js
{
  name: '@storybook/addon-styling-webpack',
  options: {
    rules: [
      // Replaces any existing Sass rules with given rules
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: { implementation: require.resolve("sass") }
          },
        ],
      },
    ]
  }
}
```

#### Less
```js
{
  name: '@storybook/addon-styling-webpack',
  options: {
    rules: [
      // Replaces any existing Sass rules with given rules
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: { implementation: require.resolve("less") }
          },
        ],
      },
    ]
  }
}
```

#### Vanilla-extract
```js
{
  name: '@storybook/addon-styling-webpack',
  options: {
    plugins: [
      new VanillaExtractPlugin(),
      new MiniCssExtractPlugin(),
    ],
    rules: [
      {
        test: /\.css$/,
        sideEffects: true,
        use: [
          require.resolve("style-loader"),
          {
              loader: require.resolve("css-loader"),
              options: {},
          },
        ],
        exclude: /\.vanilla\.css$/,
      },
      {
        // Targets only CSS files generated by vanilla-extract
        test: /\.vanilla\.css$/i,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              // Required as image imports should be handled via JS/TS import statements
              url: false,
            },
          },
        ],
      },
    ]
  }
}
```

## Troubleshooting

<details>
  <summary>
    This isn't working in my monorepo.
  </summary>

  Monorepos are a more advanced setup that may require a bit more configuration. To find out more. Refer to the Storybook FAQs on [monorepos](https://storybook.js.org/docs/faq#how-do-i-fix-module-resolution-in-special-environments).
  
</details>

## 🤝 Contributing

If you'd like to contribute to this addon, **THANK YOU**, I'd love your help 🙏

### 📝 Development scripts

- `pnpm build` build and package your addon code

### 🌲 Branch structure

- **next** - the `next` version on npm, and the development branch where most work occurs
- **main** - the `latest` version on npm and the stable version that most users use

### 🚀 Release process

1. All PRs should target the `next` branch, which depends on the `next` version of Storybook.
2. When merged, a new version of this package will be released on the `next` NPM tag.
3. If the change contains a bugfix that needs to be patched back to the stable version, please note that in PR description.
4. PRs labeled `pick` will get cherry-picked back to the `main` branch and will generate a release on the `latest` npm tag.
