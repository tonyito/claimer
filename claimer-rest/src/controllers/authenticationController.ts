import { NextFunction, Request, Response } from "express";
import firebase from "firebase";
import admin from "firebase-admin";

import AuthenticationConstants from "../constants/authenticationConstants";
import UserCollectionQueries from "../firebase/queries/userQueries";
import Authentication, { SignUpData } from "../models/authentication";
import ObjectHelpers from "../utils/helpers/objectHelpers";
import UserControllerHelpers from "./helpers/userControllerHelpers";

const { FIVE_DAYS } = AuthenticationConstants;

const { convertFirebaseUserToRESTUser } = UserControllerHelpers;
const { findOneUserByEmail, findOneUserByUsername } = UserCollectionQueries;
const { findMissingKeys } = ObjectHelpers;

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export default class AuthenticationController {
  public static async signUp(
    req: Request<null, null, SignUpData>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
  }

  public static async signIn(
    req: Request<null, null, Authentication>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let email: string = req.body.email;
      const password = req.body.password;
      const foundEmail = await findOneUserByEmail(email);
      if (foundEmail.empty) {
        const foundUser = await findOneUserByUsername(email);
        if (foundUser.empty) {
          res.status(404).send("Email/Username not found in system.");
        } else {
          email = convertFirebaseUserToRESTUser(foundUser)[0].email;
        }
      }
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
  }

  public static async signOut(
    req: Request<Record<string, string>>,
    res: Response<any, { email: string }>,
    next: NextFunction
  ): Promise<void> {
    try {
      await firebase.auth().signOut();
      next();
    } catch (error) {
      res.status(401).send(error.message);
    }
  }

  public static async createSession(
    req: Request<null, null, Authentication | SignUpData>,
    res: Response<any, { idToken: string | undefined }>,
    next: NextFunction
  ): Promise<void> {
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
  }

  public static async verifySession(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sessionCookie = req.cookies.session || "";
      const sessionVerification = await admin
        .auth()
        .verifySessionCookie(sessionCookie, true);
      const { email } = sessionVerification;
      if (email) {
        res.locals.email = email;
        next();
      } else {
        next();
      }
    } catch (error) {
      res.status(401).send(error.message);
    }
  }

  public static async endSession(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.clearCookie("session");
      next();
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
}
