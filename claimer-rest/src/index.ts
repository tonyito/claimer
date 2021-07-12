import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import cors from "cors";
import admin from "firebase-admin";

import config from "./config/config";

import UserRoutes from "./routes/userRoutes";
import AuthenticationRoutes from "./routes/authenticationRoutes";

import MainController from "./controllers/mainController";

import serviceAccount from "../serviceAccountKey.json";

const { port } = config;
const { userRoutes } = UserRoutes;
const { authenticationRoutes } = AuthenticationRoutes;
const { checkCSRFToken } = MainController;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), //casting required for ES6 import syntax
  databaseURL: "https://project-b-538a4-default-rtdb.firebaseio.com",
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use(checkCSRFToken);

app.use("/api/users", userRoutes);
app.use("/api/authentication", authenticationRoutes);

app.listen(config.port, () => console.log(`App listening on port: ${port}`));
