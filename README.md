JS Slot Machine
=========================
A slot machine game, written in JavaScript. 

### JS Config for VS Code
VS Code looks for a `jsconfig.json` file in order find explicit configuration for the JS project. Ours is located in the `/src` directory in order to scope the project there. We also configure exclusions for the `main*` Typings in favor of the `browser*` ones.

### ES6 and SystemJS
ES6 brings great support for JS modules. However, in order to make use of them consistenly, we're using a runtime module loader, [SystemJS](https://github.com/systemjs/systemjs). Additionally, we use [Babel](http://babeljs.io/) to transpile ES6 for use today.