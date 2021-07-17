import { Router } from "express";

import { healthCheck } from "../controllers/mainController";

const router = Router();

class MainRoutes {
  public mainRoutes: typeof router;

  constructor() {
    this.mainRoutes = router;

    this.mainRoutes.get("/health", healthCheck);
  }
}

export default new MainRoutes();
