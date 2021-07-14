import { nanoid } from "nanoid";

import { Roles } from "../types/userTypes";

export default class User {
  public id: string;
  public username: string;
  public firstName: string | null;
  public lastName: string | null;
  public email: string;
  public role: Roles;
  private _verified: boolean;
  constructor(
    username: string,
    firstName: string | null,
    lastName: string | null,
    email: string,
    role: Roles,
    id?: string
  ) {
    this.id = id || nanoid(8);
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
    this._verified = false;
  }

  get verified(): boolean {
    return this._verified;
  }

  set verified(value: boolean) {
    this._verified = value;
  }
}
