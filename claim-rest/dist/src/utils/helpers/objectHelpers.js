"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var ObjectHelpers = /** @class */ (function () {
    function ObjectHelpers() {
    }
    ObjectHelpers.findMissingKeys = function (obj, keys) {
        return keys.filter(function (key) { return lodash_1.isNil(obj[key]); });
    };
    return ObjectHelpers;
}());
exports.default = ObjectHelpers;
//# sourceMappingURL=objectHelpers.js.map