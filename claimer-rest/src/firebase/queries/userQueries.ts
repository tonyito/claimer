import firebase from "../db";

const firestore = firebase.firestore();

export default class UserCollectionQueries {
  public static async findOneUserByUsername(username: string) {
    return await firestore
      .collection("users")
      .where("username", "==", username)
      .get();
  }
  public static async findOneUserByEmail(email: string) {
    return await firestore
      .collection("users")
      .where("email", "==", email)
      .get();
  }
}
