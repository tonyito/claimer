import API from "../API";
import { HEALTH_URL } from "../urls/health";

export default class MainRoutes {
  public static async assignXSRFToken(): Promise<void> {
    try {
      const response = await API.GET<string>(HEALTH_URL);
      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}
export const { assignXSRFToken } = MainRoutes;
