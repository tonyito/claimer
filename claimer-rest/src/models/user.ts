import { nanoid } from "nanoid";

import { UserRoles } from "../constants/userConstants";
import UserCollectionQueries from "../firebase/queries/userQueries";
import { FoundDocument } from "../types/firebaseTypes";
import { Roles } from "../types/userTypes";

const { findOneUserByEmail } = UserCollectionQueries;

export default class User {
  public id: string;
  public username: string;
  public firstName: string | null;
  public lastName: string | null;
  public email: string;
  public role: Roles;
  public verified: boolean;
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
    this.verified = false;
  }

  public static convertFirebaseUserToRESTUser(
    foundUser: FoundDocument
  ): User[] {
    const userArr: User[] = [];
    foundUser.forEach((user) => {
      const { username, firstName, lastName, email, role, id } = user.data();
      userArr.push(new User(username, firstName, lastName, email, role, id));
    });
    return userArr;
  }

  public static async checkUserRole(email: string): Promise<number> {
    try {
      const userData = await findOneUserByEmail(email);
      const currentUserRole =
        User.convertFirebaseUserToRESTUser(userData)[0].role;
      return UserRoles[currentUserRole];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
