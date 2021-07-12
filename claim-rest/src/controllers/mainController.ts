import { NextFunction, Request, Response } from "express";

export default class MainController {
  public static checkCSRFToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.cookie("XSRF-TOKEN", req.csrfToken());
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
}
