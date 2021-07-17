import { API_URL } from "../../env/variables";

export default class UsersUrls {
  public static GET_ALL_USERS_URL = `${API_URL}/users/`;
}

export const { GET_ALL_USERS_URL } = UsersUrls;
