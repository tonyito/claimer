"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var csurf_1 = __importDefault(require("csurf"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var config_1 = __importDefault(require("./config/config"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var authenticationRoutes_1 = __importDefault(require("./routes/authenticationRoutes"));
var mainController_1 = __importDefault(require("./controllers/mainController"));
var serviceAccountKey_json_1 = __importDefault(require("../serviceAccountKey.json"));
var port = config_1.default.port;
var userRoutes = userRoutes_1.default.userRoutes;
var authenticationRoutes = authenticationRoutes_1.default.authenticationRoutes;
var checkCSRFToken = mainController_1.default.checkCSRFToken;
var csrfMiddleware = csurf_1.default({ cookie: true });
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccountKey_json_1.default),
    databaseURL: "https://project-b-538a4-default-rtdb.firebaseio.com",
});
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(csrfMiddleware);
app.use(checkCSRFToken);
app.use("/api/users", userRoutes);
app.use("/api/authentication", authenticationRoutes);
app.listen(config_1.default.port, function () { return console.log("App listening on port: " + port); });
//# sourceMappingURL=index.js.map