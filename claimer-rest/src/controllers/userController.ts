import { NextFunction, Request, Response } from "express";

import firebase from "../firebase/db";
import User from "../models/user";
import ObjectHelpers from "../utils/helpers/objectHelpers";
import UserControllerHelpers from "./helpers/userControllerHelpers";

const firestore = firebase.firestore();

const { convertFirebaseUserToRESTUser } = UserControllerHelpers;
const { findMissingKeys } = ObjectHelpers;

export default class UserController {
  public static addUser = async (
    req: Request<null, null, Omit<User, "id">>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      const missingKeys = findMissingKeys(data, [
        "username",
        "firstName",
        "lastName",
        "email",
      ]);
      if (missingKeys.length) {
        res.status(400).send({ missingKeys });
        return;
      }
      await firestore.collection("users").doc().set(data);
      res.status(201).send("User added successfully.");
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
      const foundUser = await firestore
        .collection("users")
        .where("username", "==", username)
        .get();
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
