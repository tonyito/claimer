"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = __importDefault(require("../controllers/userController"));
var addUser = userController_1.default.addUser, getUser = userController_1.default.getUser, getAllUsers = userController_1.default.getAllUsers;
var router = express_1.Router();
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.routes = router;
        /* Get all users*/
        this.routes.get("/", getAllUsers);
        /** Get user by username */
        this.routes.get("/:username", getUser);
        /** Create new user */
        this.routes.post("/", addUser);
    }
    return UserRoutes;
}());
exports.default = new UserRoutes();
//# sourceMappingURL=userRoutes.js.map