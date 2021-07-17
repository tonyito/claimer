import { API_URL } from "../../env/variables";

export default class AuthenticationUrls {
  public static readonly SESSION_URL = `${API_URL}/authentication/verifySession`;
}

export const { SESSION_URL } = AuthenticationUrls;
