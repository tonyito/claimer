import { NextFunction, Request, Response } from "express";

export default class MainController {
  public static async checkCSRFToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.cookie("XSRF-TOKEN", req.csrfToken());
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}
