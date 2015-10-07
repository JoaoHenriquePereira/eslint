/**
 * @fileoverview sort ES6 imports
 * @author Joao Henrique Pereira
 * @copyright 2015 Joao Henrique Pereira. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var defaultImports = {};
    var errors = [];
    var importsMap = {};
    var listeners = {};
    var namedImports = {};
    var namespaceImports = {};
    var order = context.options[0].order || [];

    /**
     * Checks ordering of a group of imports
     * @param { Object } group the import group
     * @returns {void}
     */
    function checkGroup(group) {
        var t = null;
        for (var key in group) {
            if (t && group[key].local.name < t) { // Is the current first key bigger than the previous last?
                errors.push([group[key],
                    group[key].loc.start,
                    group[key].local.name + " imports are out of order"]);
            } else {
                t = group[key].local.name;
            }
        }
    }

    /**
     * Checks ordering of each group
     * @returns {void}
     */
    function checkOrder() {
        var t = null;

        order.forEach(function(element) {
            var imports = importsMap[element]; // Get the imports in line for comparison
            var keys = Object.keys(imports); // ...and its keys
            if (t && keys[0] > t) { // Is the current first key bigger than the previous last?
                errors.push([imports[keys[0]],
                    imports[keys[0]].loc.start,
                    element + " imports are out of order"]);
            } else {
                t = keys[keys.length - 1];
            }
        });
    }

    /**
     * Handles ordering and groups
     * @returns {void}
     */
    function checkOrderAndGroup() {
        checkOrder();
        order.forEach(function(element) {
            checkGroup(importsMap[element]);
        });
    }

    /**
     * Extends an object without recurring to the prototype
     * @param { Object } receiver the extended object
     * @param { Object } target the target object
     * @returns {void}
     */
    function extend(receiver, target) {
        for (var i in target) {
            if (target.hasOwnProperty(i)) {
                receiver[i] = target[i];
            }
        }
    }

    listeners.ImportDefaultSpecifier = function(node) {
        defaultImports[node.local.start] = node;
    };

    listeners.ImportNamespaceSpecifier = function(node) {
        namespaceImports[node.local.start] = node;
    };

    listeners.ImportSpecifier = function(node) {
        namedImports[node.local.start] = node;
    };

    listeners["Program:exit"] = function() {
        if (order.length > 0) {
            importsMap = {
                "default": defaultImports,
                "named": namedImports,
                "namespace": namespaceImports
            };
            checkOrderAndGroup();
        } else {
            var wholeGroup = {};

            extend(wholeGroup, defaultImports);
            extend(wholeGroup, namedImports);
            extend(wholeGroup, namespaceImports);

            if (Object.keys(wholeGroup).length > 0) {
                checkGroup(wholeGroup);
            }
        }

        errors.forEach(function(error) {
            context.report.apply(error);
        });
    };

    return listeners;
};

module.exports.schema = [
    {
        "type": "object",
        "properties": {
            "ignoreCase": {
                "type": "boolean"
            },
            "order": {
                "type": "array",
                "items": {
                    "type": "string",
                    "enum": ["namespace", "named", "default"]
                },
                "minItems": 3,
                "maxItems": 3,
                "uniqueItems": true
            }
        },
        "additionalProperties": false
    }
];

