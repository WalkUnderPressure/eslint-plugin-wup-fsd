/**
 * @fileoverview Check that all imports inside one module are relative.
 * @author WalkUnderPressure
 */
"use strict";

const path = require('path');

const MessageIds = Object.freeze({
  'invalid-import': 'invalid-import',
  'slice-relative': 'slice-relative',
});

const LAYERS = Object.freeze({
  'entities': 'entities',
  'features': 'features',
  'shared': 'shared',
  'pages': 'pages',
  'widgets': 'widgets',
});

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "Check that all imports inside one module are relative.",
      recommended: false,
      url: null,
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [],
    messages: {
      [MessageIds['invalid-import']]: 'Import should be relative!',
      [MessageIds['slice-relative']]: 'Within a single slice, all imports must be relative',
    },
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        // Example: "app/entities/Post"
        const importTo = node.source.value;

        // C:/Projects/app-one/src/app/entities/Post/Header.tsx
        const fromFileName = context.filename;

        if(shouldBeRelative(fromFileName, importTo)) {
          context.report({node, messageId: MessageIds['slice-relative'] })
        }
      }
    };
  },
};

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}

function shouldBeRelative(from, to) {
  if(isPathRelative(to)) {
    return false;
  }

  // example entities/Article
  const toArray = to.split('/')
  const toLayer = toArray[0]; // entities
  const toSlice = toArray[1]; // Article

  if(!toLayer || !toSlice || !LAYERS[toLayer]) {
    return false;
  }

  const normalizedPath = path.toNamespacedPath(from);
  const projectFrom = normalizedPath.split('src')[1];
  const fromArray = projectFrom.split('\\')

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if(!fromLayer || !fromSlice || !LAYERS[fromLayer]) {
    return false;
  }

  return fromSlice === toSlice && toLayer === fromLayer;
}

// TODO: Move this code to tests
// Examples:
// const testImports = [
//   ['C:\\Users\\user\\Desktop\\js\\some_app\\src\\entities\\Name', 'entities/Name/one'],
//   ['C:\\Users\\user\\Desktop\\js\\some_app\\src\\entities\\Name', 'entities/Another/one'],
//   ['C:\\Users\\user\\Desktop\\js\\some_app\\src\\entities\\Name', 'features/Name/one'],
//   ['C:\\Users\\user\\Desktop\\js\\some_app\\src\\features\\Name', 'features/Name/one'],
//   ['C:\\Users\\user\\Desktop\\js\\some_app\\src\\entities\\Name', 'app/index.tsx'],
//   ['C:/Users/user/Desktop/js/some_app/src/entities/Name', 'entities/Name/one/two'],
//   ['C:\\Users\\user\\Desktop\\js\\some_app\\src\\entities\\Name', '../../model/selectors/getSomeItems'],
// ]

// testImports.forEach(([from, to]) => {
//   const isShouldBeRelative = shouldBeRelative(from, to);
//   console.log('from:', from);
//   console.log('to:', to);
//   console.log('shouldBeRelative: ', isShouldBeRelative, '\n')
// })
