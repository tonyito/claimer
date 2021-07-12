import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import firebase from "firebase";

import Authentication from "../models/authentication";
import AuthenticationConstants from "../constants/authenticationConstants";

const { FIVE_DAYS } = AuthenticationConstants;

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export default class AuthenticationController {
  public static signIn = async (
    req: Request<null, null, Authentication>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const authenticationResult = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const { user } = authenticationResult;
      const idToken = await user?.getIdToken();
      if (idToken) {
        const sessionCookie = await admin
          .auth()
          .createSessionCookie(idToken, { expiresIn: FIVE_DAYS });
        const options = { maxAge: FIVE_DAYS, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.send("Login Successful");
      }
    } catch (error) {
      res.status(401).send(error.message);
    }
  };
  public static verifySession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const sessionCookie = req.cookies.session || "";
      const sessionVerification = await admin
        .auth()
        .verifySessionCookie(sessionCookie, true);
      const { email } = sessionVerification;
      if (email) {
        res.locals.email = email;
        next();
      }
      next();
    } catch (error) {
      res.status(401).send(error.message);
    }
  };
}
