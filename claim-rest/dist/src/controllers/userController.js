"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../firebase/db"));
var objectHelpers_1 = __importDefault(require("../utils/helpers/objectHelpers"));
var userControllerHelpers_1 = __importDefault(require("./helpers/userControllerHelpers"));
var firestore = db_1.default.firestore();
var convertFirebaseUserToRESTUser = userControllerHelpers_1.default.convertFirebaseUserToRESTUser;
var findMissingKeys = objectHelpers_1.default.findMissingKeys;
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.addUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var data, missingKeys, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    data = req.body;
                    missingKeys = findMissingKeys(data, [
                        "username",
                        "firstName",
                        "lastName",
                        "email",
                    ]);
                    if (missingKeys.length) {
                        res.status(400).send({ missingKeys: missingKeys });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, firestore.collection("users").doc().set(data)];
                case 1:
                    _a.sent();
                    res.status(201).send("User added successfully.");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(400).send(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var username, foundUser, userArr, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    username = req.params.username;
                    return [4 /*yield*/, firestore
                            .collection("users")
                            .where("username", "==", username)
                            .get()];
                case 1:
                    foundUser = _a.sent();
                    if (foundUser.empty) {
                        res.status(404).send("User not found.");
                    }
                    else {
                        userArr = convertFirebaseUserToRESTUser(foundUser);
                        res.send(userArr);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(400).send(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var users, userArr, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, firestore.collection("users").get()];
                case 1:
                    users = _a.sent();
                    if (users.empty) {
                        res.status(404).send("No users found.");
                    }
                    else {
                        userArr = convertFirebaseUserToRESTUser(users);
                        res.send(userArr);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(400).send(error_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=userController.js.map