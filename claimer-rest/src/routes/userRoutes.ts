import { Router } from "express";

import UserController from "../controllers/userController";

const { addUser, getUser, getAllUsers } = UserController;

const router = Router();

class UserRoutes {
  public userRoutes: typeof router;

  constructor() {
    this.userRoutes = router;
    /* Get all users*/
    this.userRoutes.get("/", getAllUsers);
    /** Get user by username */
    this.userRoutes.get("/:username", getUser);
    /** Create new user */
    this.userRoutes.post("/", addUser);
  }
}

export default new UserRoutes();
