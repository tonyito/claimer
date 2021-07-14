import { UserRoles } from "../../constants/userConstants";
import UserCollectionQueries from "../../firebase/queries/userQueries";
import User from "../../models/user";
import { FoundDocument } from "../../types/firebaseTypes";

const { findOneUserByEmail } = UserCollectionQueries;

export default class UserControllerHelpers {
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
        UserControllerHelpers.convertFirebaseUserToRESTUser(userData)[0].role;
      return UserRoles[currentUserRole];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
