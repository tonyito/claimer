import { Router } from "express";

import UserController from "../controllers/userController";

const { addUser, getUser, getAllUsers } = UserController;

const router = Router();

class UserRoutes {
  public routes: typeof router;

  constructor() {
    this.routes = router;
    /* Get all users*/
    this.routes.get("/", getAllUsers);
    /** Get user by username */
    this.routes.get("/:username", getUser);
    /** Create new user */
    this.routes.post("/", addUser);
  }
}

export default new UserRoutes();
