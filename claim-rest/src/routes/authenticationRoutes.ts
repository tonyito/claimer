import { Router } from "express";

import AuthenticationController from "../controllers/authenticationController";

const { signIn } = AuthenticationController;

const router = Router();

class AuthenticationRoutes {
  public authenticationRoutes: typeof router;

  constructor() {
    this.authenticationRoutes = router;

    this.authenticationRoutes.post("/signin", signIn);
  }
}

export default new AuthenticationRoutes();
