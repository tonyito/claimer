import { nanoid } from "nanoid";

export default class User {
  public id: string;
  public username: string;
  public firstName: string | null;
  public lastName: string | null;
  public email: string;
  constructor(
    username: string,
    firstName: string | null,
    lastName: string | null,
    email: string,
    id?: string
  ) {
    this.id = id || nanoid(8);
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
