/**
 * @fileoverview Tests for sort-imports rule.
 * @author Joao Henrique Pereira
 * @copyright 2015 Joao Henrique Pereira. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/array-bracket-spacing"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var expectedError = {
    message: "Variables within the same declaration block should be sorted alphabetically",
    type: "VariableDeclarator"
};

var ruleTester = new RuleTester();
ruleTester.run("sort-imports", rule, {

    valid: [

    ],

    invalid: [
        {
            code: "import _ from \"foo\";import { x , F } from \"foo\";import { z } from \"foo\";import b from \"foo\";import * as lib from \"foo\";import A from \"foo\";",
            options: [ { "order": ["namespace", "named", "default"] } ],
            errors: [ expectedError ]
        },
        {
            code: "import _ from \"foo\";import { F } from \"foo\";import { z } from \"foo\";import b from \"foo\";",
            options: [ { "order": ["namespace", "named", "default"] } ],
            errors: [ expectedError ]
        },
        {
            code: "import _ from \"foo\";import { x , F } from \"foo\";import { z } from \"foo\";import b from \"foo\";import * as lib from \"foo\";import A from \"foo\";",
            options: [ { "order": ["namespace", "named", "default"] } ],
            errors: [ expectedError ]
        }
    ]
});
