"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authenticationController_1 = __importDefault(require("../controllers/authenticationController"));
var signIn = authenticationController_1.default.signIn;
var router = express_1.Router();
var AuthenticationRoutes = /** @class */ (function () {
    function AuthenticationRoutes() {
        this.authenticationRoutes = router;
        this.authenticationRoutes.post("/signin", signIn);
    }
    return AuthenticationRoutes;
}());
exports.default = new AuthenticationRoutes();
//# sourceMappingURL=authenticationRoutes.js.map