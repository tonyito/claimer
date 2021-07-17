import { Router } from "express";

import {
  createSession,
  endSession,
  signIn,
  signOut,
  signUp,
  verifySession,
} from "../controllers/authenticationController";
import { addUser } from "../controllers/userController";

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
      "/signout",
      signOut,
      endSession,
      (req, res) => {
        res.send("Logout successful.");
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
