"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var assert_1 = __importDefault(require("assert"));
dotenv_1.default.config();
var _a = process.env, PORT = _a.PORT, HOST = _a.HOST, HOST_URL = _a.HOST_URL, apiKey = _a.apiKey, authDomain = _a.authDomain, databaseURL = _a.databaseURL, projectId = _a.projectId, storageBucket = _a.storageBucket, messagingSenderId = _a.messagingSenderId, appId = _a.appId;
assert_1.default(PORT, "PORT required.");
assert_1.default(HOST, "HOST required.");
exports.default = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: apiKey,
        authDomain: authDomain,
        databaseURL: databaseURL,
        projectId: projectId,
        storageBucket: storageBucket,
        messagingSenderId: messagingSenderId,
        appId: appId,
    },
};
//# sourceMappingURL=config.js.map