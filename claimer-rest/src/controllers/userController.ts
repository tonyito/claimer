import { NextFunction, Request, Response } from "express";

import firebase from "../firebase/db";
import UserCollectionQueries from "../firebase/queries/userQueries";
import { SignUpData } from "../models/authentication";
import User from "../models/user";
import ObjectHelpers from "../utils/helpers/objectHelpers";
import UserControllerHelpers from "./helpers/userControllerHelpers";

const firestore = firebase.firestore();

const { convertFirebaseUserToRESTUser } = UserControllerHelpers;
const { findMissingKeys } = ObjectHelpers;
const { findOneUserByUsername } = UserCollectionQueries;

export default class UserController {
  public static addUser = async (
    req: Request<null, null, SignUpData>,
    res: Response,
    next: NextFunction
  ) => {
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
        .set({ ...new User(username, null, null, email) });
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  public static getUser = async (
    req: Request<Record<string, string>>,
    res: Response,
    next: NextFunction
  ) => {
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
  };
  public static getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
  };
}
