/**
 * @fileoverview Check that all imports inside one module are relative.
 * @author WalkUnderPressure
 */
"use strict";

const MessageIds = Object.freeze({
  'invalid-import': 'invalid-import',
})

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
    },
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        console.log('node', node);

        // Example: "app/entities/Post"
        const importTo = node.source.value;

        // C:/Projects/app-one/src/app/entities/Post/Header.tsx
        const fromFileName = context.filename;

        console.log('>>> importTo', importTo)
        console.log('>>> fromFileName', fromFileName)

        context.report({node, messageId: MessageIds['invalid-import'] })
      }
    };
  },
};
