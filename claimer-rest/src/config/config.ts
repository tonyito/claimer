import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = process.env;

assert(PORT, "PORT required.");
assert(HOST, "HOST required.");

export default {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig: {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  },
};
