import { Router } from "express";
import AuthenticationController from "../controllers/authenticationController";

import UserController from "../controllers/userController";

const { addUser, getUser, getAllUsers, patchUser } = UserController;
const { verifySession } = AuthenticationController;

const router = Router();

class UserRoutes {
  public userRoutes: typeof router;

  constructor() {
    this.userRoutes = router;

    this.userRoutes.get("/", getAllUsers);
    this.userRoutes.get("/:username", getUser);

    this.userRoutes.post("/", addUser);

    this.userRoutes.patch("/:username", verifySession, patchUser);
  }
}

export default new UserRoutes();
