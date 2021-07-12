import express from "express";
import config from "./config/config";

import UserRoutes from "./routes/userRoutes";

const { port } = config;
const { routes } = UserRoutes;

const app = express();

app.use(express.json());

app.use("/api/users", routes);

app.listen(config.port, () => console.log(`App listening on port: ${port}`));
