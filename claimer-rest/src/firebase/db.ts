import firebase from "firebase";
import config from "../config/config";

export default firebase.initializeApp(config.firebaseConfig);
