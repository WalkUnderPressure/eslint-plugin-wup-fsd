# eslint-plugin-wup-fsd

Eslint plugin with rules for correct FSD operation

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i -D eslint
```

Next, install `eslint-plugin-wup-fsd`:

```sh
npm i -D eslint-plugin-wup-fsd
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-wup-fsd` and add `wup-fsd` to the `plugins` key:

```js
import eslintFsd from "eslint-plugin-wup-fsd";

export default [
    {
        plugins: {
            'wup-fsd': eslintFsd,
        }
    }
];
```

Then configure the rules you want to use under the `rules` key.

```js
import eslintFsd from "eslint-plugin-wup-fsd";

export default [
    {
        plugins: {
            'wup-fsd': eslintFsd,
        },
        rules: {
            "wup-fsd/rule-name": "warn"
        }
    }
];
```
