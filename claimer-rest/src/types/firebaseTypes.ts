import firebase from "firebase";

export type FoundDocument =
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
