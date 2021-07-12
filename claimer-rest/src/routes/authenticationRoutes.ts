import { Router } from "express";

import AuthenticationController from "../controllers/authenticationController";
import UserController from "../controllers/userController";

const { signUp, signIn, createSession, verifySession } =
  AuthenticationController;
const { addUser } = UserController;

const router = Router();

class AuthenticationRoutes {
  public authenticationRoutes: typeof router;

  constructor() {
    this.authenticationRoutes = router;

    this.authenticationRoutes.post(
      "/signin",
      signIn,
      createSession,
      (req, res) => {
        res.send("Login successful.");
      }
    );
    this.authenticationRoutes.post(
      "/signup",
      signUp,
      addUser,
      createSession,
      (req, res) => {
        res.send("Registration successful.");
      }
    );

    this.authenticationRoutes.get("/verifySession", verifySession, (req, res) =>
      res.send(res.locals)
    );
  }
}

export default new AuthenticationRoutes();
