"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../../models/user"));
var UserControllerHelpers = /** @class */ (function () {
    function UserControllerHelpers() {
    }
    UserControllerHelpers.convertFirebaseUserToRESTUser = function (foundUser) {
        var userArr = [];
        foundUser.forEach(function (user) {
            var _a = user.data(), username = _a.username, firstName = _a.firstName, lastName = _a.lastName, email = _a.email;
            userArr.push(new user_1.default(user.id, username, firstName, lastName, email));
        });
        return userArr;
    };
    return UserControllerHelpers;
}());
exports.default = UserControllerHelpers;
//# sourceMappingURL=userControllerHelpers.js.map