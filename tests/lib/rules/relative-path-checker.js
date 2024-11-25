/**
 * @fileoverview Check that all imports inside one module are relative.
 * @author WalkUnderPressure
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/relative-path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("relative-path-checker", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "import Item from 'features/some'",
      errors: [{ messageId: "This code should fail.", type: "import should be relative" }],
    },
  ],
});
