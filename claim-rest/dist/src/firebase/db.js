"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = __importDefault(require("firebase"));
var config_1 = __importDefault(require("../config/config"));
exports.default = firebase_1.default.initializeApp(config_1.default.firebaseConfig);
//# sourceMappingURL=db.js.map