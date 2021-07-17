import { Router } from "express";

import { verifySession } from "../controllers/authenticationController";
import {
  addUser,
  getUser,
  getAllUsers,
  patchUser,
} from "../controllers/userController";

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
