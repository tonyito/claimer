import { DateTime } from "luxon";
import { nanoid } from "nanoid";

import AuthenticationConstants from "../constants/authenticationConstants";

const { ONE_DAY } = AuthenticationConstants;

export default class Authentication {
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class SignUpData extends Authentication {
  public username: string;

  constructor(email: string, password: string, username: string) {
    super(email, password);
    this.username = username;
  }
}

export class EmailVerificationCode {
  public email: string;
  public code: string;
  public expiration: number;

  constructor(email: string) {
    this.email = email;
    this.code = nanoid(10);
    this.expiration = DateTime.now().toMillis() + ONE_DAY;
  }
}
