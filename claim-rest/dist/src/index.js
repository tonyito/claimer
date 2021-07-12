"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("./config/config"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var port = config_1.default.port;
var routes = userRoutes_1.default.routes;
var app = express_1.default();
app.use(express_1.default.json());
app.use("/api/users", routes);
app.listen(config_1.default.port, function () { return console.log("App listening on port: " + port); });
//# sourceMappingURL=index.js.map