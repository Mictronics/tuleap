# Vue.js

[Vue.js](https://vuejs.org/) is an open-source JavaScript
component-based framework that makes it easy to develop reactive
applications.

Here you will find some guidelines explaining how you should proceed to
build up you application.

## Before beginning

Vue.js can be used along with some additional libraries like [Vue Router](https://router.vuejs.org/). To know when you have to use these libraries, here is a table that will help you to decide:

| Your app                                  | Which lib should I use? |
|:------------------------------------------|:------------------------|
| Is medium-sized and has complex workflows | Vue.js                  |
| Has several pages to display              | Vue.js + Vue Router     |

Since Vue 3, we do not recommend using stores like [Pinia](https://pinia.vuejs.org/) anymore. Most of the time, [Provide / Inject](https://vuejs.org/guide/components/provide-inject.html) is sufficient to deal with shared state or with communication between remote components (for example, to display an app-level error message).

We strongly suggest you to install the [vue-devtools browser
extension](https://github.com/vuejs/devtools). It provides nice features
that ease the development of your applications.

## Folder structure of a Vue application

A Vue app has to be split out in distinct parts.

Here is the folder structure you have to follow:

```text
my-plugin/
  |-- build-manifest.json # Edit it to declare your app for translations
  |-- scripts/
       |-- my-vue-app/
            |-- frontend-assets/        # Generated by Vite. Never edit manually.
            |-- po/                     # Localization strings
                 |-- fr_FR.po           # Localized strings for French
            |-- src/                    # The app source-code
                 |-- api/               # REST API consumers
                 |-- components/        # Vue components
                      |-- MyFeature/
                      |-- OtherFeature/
                 |-- store/             # Pinia store modules (actions/mutations/getters)
                 |-- router/            # Vue-router modules
                 |-- main.ts            # App bootstrapping
            |-- package.json            # Declares the App, its dependencies and its build script.
            |-- pnpm-lock.yaml          # Generated by pnpm. Never edit manually.
            |-- tsconfig.json           # Typescript configuration
            |-- vite.config.ts          # Vite configuration to build the App
```

## Build your Vue application

The build system will read `build-manifest.json` to understand how and
where it needs to extract translated strings.

```json5
// tuleap/plugins/my-plugin/build-manifest.json
{
    "name": "my-plugin",
    "gettext-vue3": {
        "my-vue-app": {
            "src": "scripts/my-vue-app/src",
            "po": "scripts/my-vue-app/po"
        }
    }
}
```

To build up your application, you will have to create a `vite.config.ts`
file. This file should be located in `my-plugin/scripts/my-vue-app/`.

```TypeScript
// tuleap/plugins/my-plugin/scripts/my-vue-app/vite.config.ts
import { vite } from "@tuleap/build-system-configurator";
import * as path from "node:path";
import vue from "@vitejs/plugin-vue";
import PoGettextPlugin from "@tuleap/po-gettext-plugin";

export default vite.defineAppConfig(
    {
        plugin_name: path.basename(path.resolve(__dirname, "../..")),
        sub_app_name: path.basename(__dirname),
    },
    {
        plugins: [PoGettextPlugin.vite(), vue()],
        build: {
            rollupOptions: {
                input: {
                    "my-vue-app": path.resolve(__dirname, "src/main.ts"),
                },
            },
        },
    }
);
```

Once you have a Vite config, you will need a `package.json` in
`my-plugin/scripts/my-vue-app/`.

```json5
// tuleap/plugins/my-plugin/scripts/my-vue-app/package.json
{
  "author": "Enalean Team",             // or yourself
  "name": "@tuleap/plugin-my-plugin-my-vue-app",
  "homepage": "https://tuleap.org",     // or your plugin's homepage
  "license": "GPL-2.0-or-later",        // or your license
  "private": true,
  "type": "module",
  "dependencies": {
    "@tuleap/dom": "workspace:^",
    "pinia": "^2.0.21",
    "vue": "^3.2.37",
    "vue3-gettext": "^2.2.1"
  },
  "devDependencies": {
    "@tuleap/build-system-configurator": "workspace:^",
    "@tuleap/po-gettext-plugin": "workspace:^",
  },
  "scripts": {
    "typecheck": "vue-tsc --noEmit",
    "build": "vite build",
    "watch": "NODE_ENV=development vite build --watch --mode development --minify false", // the NODE_ENV variable allows Vue dev tools to function
    "test": "vitest"
  }
}
```

All the Vite and Vitest dependencies are available at the tuleap root
folder.

Use the pnpm scripts to build up the application or to run the unit
tests.

```bash
pnpm run typecheck # Run TypeScript type check on your code and unit tests.
pnpm run build     # For a production build, outputs minified code.
pnpm run watch     # Build the app in watch mode.
pnpm test          # Run the Vitest unit tests only once.
```

Once you have a `package.json` file, you will also need a
`tsconfig.json` file to configure Typescript.

```json5
// tuleap/plugins/my-plugin/scripts/my-vue-app/tsconfig.json
{
    "extends": "@tuleap/build-system-configurator/tsc/tsconfig-for-apps.json",
    "compilerOptions": {
        "types": ["ckeditor"], // Add global types needed by your application
    },
    "include": ["src/**/*"]
}
```

## Bootstrap your application

This section will explain you how to properly integrate your application
in Tuleap.

### Create a mount point

To allow your app to run in Tuleap, you may need to create a mount point
in a mustache template. Your mount point needs to have a unique
identifier in order to be easily retrieved from the DOM. This is also
the place where you can pass some data from PHP to TypeScript via
`data-*` attributes:

```html
<div class="tlp-pane">
   <div id="my-vue-app-mount-point"
       data-user-info="{{ user }}"
   ></div>
</div>
```

Once your mount point is ready, head to your `main.ts` file.

```TypeScript
// tuleap/plugins/my-plugin/scripts/my-vue-app/src/main.ts

import { createApp } from "vue";
import { getPOFileFromLocaleWithoutExtension, initVueGettext } from "@tuleap/vue3-gettext-init";
import { createGettext } from "vue3-gettext";
import { getAttributeOrThrow, selectOrThrow } from "@tuleap/dom";
import MyVueApp from "./components/MyVueApp.vue";
import { USER_INFO } from "./injection-symbols.ts";

const MOUNT_POINT_SELECTOR = "#my-vue-app-mount-point";

document.addEventListener("DOMContentLoaded", async () => {
    // Retrieve the mount point from the DOM
    const mount_point = selectOrThrow(MOUNT_POINT_SELECTOR);

    // Dynamically import the translations relevant to the current user's language.
    const gettext_plugin = await initVueGettext(
        createGettext,
        (locale) => import(`../po/${getPOFileFromLocaleWithoutExtension(locale)}.po`)
    );

    // Retrieve the JSON data from the mount point
    const user_info = JSON.parse(getDatasetItemOrThrow(mount_point, "data-user-info"));

    createApp(MyVueApp)
        .use(gettext_plugin)
        // provide the mount-point data to the components in the App
        .provide(USER_INFO, user_info)
        // Replace the mount point's HTML element with the rendered App
        .mount(mount_point);
});
```

## Vue and Typescript

The reference language to use with Vue.js is now
[Typescript](https://www.typescriptlang.org).

## Best-practices for Tuleap

When you submit a patch for review, we may request changes to better
match the following best practices. Please try to follow them. Many
rules are already enforced by the pre-commit hook that runs
[eslint](https://eslint.org/) with
[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue).

- Please avoid the usage of [vue directives shorthands](https://v2.vuejs.org/v2/guide/syntax.html#Shorthands). Shorthands are nice to use, but it is not obvious for the others to figure out which directive you are actually using.
- Always use `PascalCase` for component names.
- Always use multi-word names for components, for example: \"DocumentSearch\". In templates, this translates as `<document-search/>`. See [the dedicated Vue Style Guide rule](https://v2.vuejs.org/v2/style-guide/#Multi-word-component-names-essential).
- Always use `snake_case` for computed properties. See [Tuleap coding standards](./../coding-standards.md).
- Always use `snake_case` for props. They follow the same rule as variables.
- Always use `camelCase` for methods.
- Always use `snake_case` for Pinia State properties and Getters. They are properties too.
- Always use `camelCase` for Pinia Mutations and Actions. They are methods.
- Always name files and folders inside `components/` with `PascalCase` (just like component names).
- Always name typescript files (in all other folders) with `dash-case`.
- Avoid having too many components that depend on `this.$route`. Inject what you need via props instead.
- Always use named exports in Pinia Getters, Mutations and Actions. Default export may be used for State definition. Named exports make it easier to import only what we want.
- Always use the inline export syntax `export function myAction()` or `export const myMutation() => {}`. It makes it easy to add "private" (non-exported) functions that will be reused.

### Resources

-   [Vue.js](https://vuejs.org/)
-   [Pinia](https://pinia.vuejs.org/)
-   [Vue Router](https://router.vuejs.org/)
-   [Vue.js Official Style Guide](https://vuejs.org/style-guide/)
-   eslint-plugin-vue\'s rules: <https://eslint.vuejs.org/rules/>
-   [TypeScript reference](https://www.typescriptlang.org)
-   [vue-gettext](https://github.com/Polyconseil/vue-gettext)
-   [Vite](https://vitejs.dev/)
