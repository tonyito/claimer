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
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var firebase_1 = __importDefault(require("firebase"));
var authenticationConstants_1 = __importDefault(require("../constants/authenticationConstants"));
var FIVE_DAYS = authenticationConstants_1.default.FIVE_DAYS;
firebase_1.default.auth().setPersistence(firebase_1.default.auth.Auth.Persistence.NONE);
var AuthenticationController = /** @class */ (function () {
    function AuthenticationController() {
    }
    AuthenticationController.signIn = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var username, password, authenticationResult, user, idToken, sessionCookie, options, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    username = req.body.username;
                    password = req.body.password;
                    return [4 /*yield*/, firebase_1.default
                            .auth()
                            .signInWithEmailAndPassword(username, password)];
                case 1:
                    authenticationResult = _a.sent();
                    user = authenticationResult.user;
                    return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.getIdToken())];
                case 2:
                    idToken = _a.sent();
                    if (!idToken) return [3 /*break*/, 4];
                    return [4 /*yield*/, firebase_admin_1.default
                            .auth()
                            .createSessionCookie(idToken, { expiresIn: FIVE_DAYS })];
                case 3:
                    sessionCookie = _a.sent();
                    options = { maxAge: FIVE_DAYS, httpOnly: true };
                    res.cookie("session", sessionCookie, options);
                    res.send("Login Successful");
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    res.status(401).send(error_1.message);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return AuthenticationController;
}());
exports.default = AuthenticationController;
//# sourceMappingURL=authenticationController.js.map