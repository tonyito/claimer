import { Router } from "express";

import AuthenticationController from "../controllers/authenticationController";

const { signIn, verifySession } = AuthenticationController;

const router = Router();

class AuthenticationRoutes {
  public authenticationRoutes: typeof router;

  constructor() {
    this.authenticationRoutes = router;

    this.authenticationRoutes.post("/signin", signIn);

    this.authenticationRoutes.get("/verifySession", verifySession, (req, res) =>
      res.send(res.locals)
    );
  }
}

export default new AuthenticationRoutes();
