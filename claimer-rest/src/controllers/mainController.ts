import { NextFunction, Request, Response } from "express";

export default class MainController {
  public static healthCheck(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).send("OK");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  public static async checkCSRFToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const XSRF_TOKEN = req.cookies["XSRF-TOKEN"];
      if (XSRF_TOKEN) {
        next();
        return;
      }
      res.cookie("XSRF-TOKEN", req.csrfToken());
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export const { checkCSRFToken, healthCheck } = MainController;
