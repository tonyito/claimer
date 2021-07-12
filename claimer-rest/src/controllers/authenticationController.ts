import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import firebase from "firebase";

import Authentication, { SignUpData } from "../models/authentication";
import AuthenticationConstants from "../constants/authenticationConstants";
import UserCollectionQueries from "../firebase/queries/userQueries";
import ObjectHelpers from "../utils/helpers/objectHelpers";

const { FIVE_DAYS } = AuthenticationConstants;

const { findOneUserByEmail, findOneUserByUsername } = UserCollectionQueries;
const { findMissingKeys } = ObjectHelpers;

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export default class AuthenticationController {
  public static signUp = async (
    req: Request<null, null, SignUpData>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const username = req.body.username;

      const missingKeys = findMissingKeys(req.body, [
        "email",
        "username",
        "password",
      ]);
      if (missingKeys.length) {
        res.status(400).send({ missingKeys });
        return;
      }
      const [emailData, usernameData] = await Promise.all([
        findOneUserByEmail(email),
        findOneUserByUsername(username),
      ]);

      if (!usernameData.empty) {
        res.send("Account with that username already exists.");
        return;
      } else if (!emailData.empty) {
        res.send("Account with that email address already exists.");
        return;
      }

      const userCredentialResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { user } = userCredentialResult;
      const idToken = await user?.getIdToken();
      res.locals.idToken = idToken;
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

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
      res.locals.idToken = idToken;
      next();
    } catch (error) {
      res.status(401).send(error.message);
    }
  };

  public static createSession = async (
    req: Request<null, null, Authentication | SignUpData>,
    res: Response<any, { idToken: string | undefined }>,
    next: NextFunction
  ) => {
    try {
      const idToken = res.locals.idToken;
      if (idToken) {
        const sessionCookie = await admin
          .auth()
          .createSessionCookie(idToken, { expiresIn: FIVE_DAYS });
        const options = { maxAge: FIVE_DAYS, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        next();
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
