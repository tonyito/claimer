import User from "../../models/user";
import { FoundDocument } from "../../types/firebaseTypes";

export default class UserControllerHelpers {
  public static convertFirebaseUserToRESTUser(foundUser: FoundDocument) {
    const userArr: User[] = [];
    foundUser.forEach((user) => {
      const { username, firstName, lastName, email } = user.data();
      userArr.push(new User(user.id, username, firstName, lastName, email));
    });
    return userArr;
  }
}
