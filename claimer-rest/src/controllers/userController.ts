import { NextFunction, Request, Response } from "express";
import { pick } from "lodash";

import firebase from "../firebase/db";
import { findOneUserByUsername } from "../firebase/queries/userQueries";
import { SignUpData } from "../models/authentication";
import User, {
  checkUserRole,
  convertFirebaseUserToRESTUser,
} from "../models/user";
import { findMissingKeys } from "../utils/helpers/objectHelpers";

const firestore = firebase.firestore();

export default class UserController {
  public static async addUser(
    req: Request<null, null, SignUpData>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;
      const missingKeys = findMissingKeys(data, ["username", "email"]);
      if (missingKeys.length) {
        res.status(400).send({ missingKeys });
        return;
      }
      const { username, email } = data;
      await firestore
        .collection("users")
        .doc()
        .set({ ...new User(username, null, null, email, "claimer") });
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  public static async getUser(
    req: Request<Record<string, string>>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const username = req.params.username;
      const foundUser = await findOneUserByUsername(username);
      if (foundUser.empty) {
        res.status(404).send("User not found.");
      } else {
        const userArr = convertFirebaseUserToRESTUser(foundUser);
        res.send(userArr);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  public static async patchUser(
    req: Request<Record<string, string>>,
    res: Response<any, { email: string }>,
    next: NextFunction
  ): Promise<void> {
    try {
      const username = req.params.username;
      const validEmail = res.locals.email;

      const userRoleLevel = await checkUserRole(validEmail);

      const foundUser = await findOneUserByUsername(username);
      if (foundUser.empty) {
        res.status(404).send("User not found.");
        return;
      } else {
        const userArr = convertFirebaseUserToRESTUser(foundUser);
        const currentUser = userArr[0];
        if (currentUser.email === validEmail || userRoleLevel <= 1) {
          const fieldsAllowedToEdit = pick(req.body, ["firstName", "lastName"]);
          const documentId = foundUser.docs[0].id;
          await firestore
            .collection("users")
            .doc(documentId)
            .update(fieldsAllowedToEdit);
          res.send("Document successfully updated.");
          return;
        } else {
          res.status(403).send("User does not have permission to edit.");
        }
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  public static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await firestore.collection("users").get();
      if (users.empty) {
        res.status(404).send("No users found.");
      } else {
        const userArr = convertFirebaseUserToRESTUser(users);
        res.send(userArr);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export const { addUser, getUser, getAllUsers, patchUser } = UserController;
