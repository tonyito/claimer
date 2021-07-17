import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import csrf from "csurf";
import express from "express";
import admin from "firebase-admin";

import serviceAccount from "../serviceAccountKey.json";
import config from "./config/config";
import { checkCSRFToken } from "./controllers/mainController";
import AuthenticationRoutes from "./routes/authenticationRoutes";
import MainRoutes from "./routes/mainRoutes";
import UserRoutes from "./routes/userRoutes";

const { port } = config;
const { userRoutes } = UserRoutes;
const { authenticationRoutes } = AuthenticationRoutes;
const { mainRoutes } = MainRoutes;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), //casting required for ES6 import syntax
  databaseURL: config.firebaseConfig.databaseURL,
});

const whitelist = ["http://localhost:3000"]; //Add client URL on deploy
const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin = "", callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use(checkCSRFToken);

app.use("/api/", mainRoutes);
app.use("/api/users", userRoutes);
app.use("/api/authentication", authenticationRoutes);

app.listen(config.port, () => console.log(`App listening on port: ${port}`));
