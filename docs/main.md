# Using [generator-eslint](https://www.npmjs.com/package/generator-eslint "npm package")

You must also install Yeoman, if you don't have it installed already. To install Yeoman, you can run this command:

```shell
npm i -g yo
```

With Node.js and Yeoman installed, you can run this command:

```shell
npm i -g generator-eslint
```

### eslint:plugin

If you want to create a new ESLint plugin, make sure you're in the top-level directory where you want the plugin to be created and type:

```
yo eslint:plugin
```

You'll be prompted for information about your plugin and it will generate a `package.json` file, README, and source code for a stub plugin.

### eslint:rule

If you want to create a new ESLint rule, make sure you're in the top-level directory of an ESLint repo clone or an ESLint plugin and type:

```shell
yo eslint:rule
```

You'll be prompted for some information and then it will generate the files necessary for a new rule, including the source file, a test file, and a documentation file.


After you write some rule code you need to login to NPM with this command:

```
npm login
```

After this you can publish your package to NPM with next command:

```
npm publish
```
