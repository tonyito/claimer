import { FoundDocument } from "../../types/firebaseTypes";
import firebase from "../db";

const firestore = firebase.firestore();

export default class UserCollectionQueries {
  public static async findOneUserByUsername(
    username: string
  ): Promise<FoundDocument> {
    return await firestore
      .collection("users")
      .where("username", "==", username)
      .get();
  }
  public static async findOneUserByEmail(
    email: string
  ): Promise<FoundDocument> {
    return await firestore
      .collection("users")
      .where("email", "==", email)
      .get();
  }
}

export const { findOneUserByEmail, findOneUserByUsername } =
  UserCollectionQueries;
