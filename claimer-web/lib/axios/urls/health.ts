import { API_URL } from "../../env/variables";

export default class HealthUrls {
  public static readonly HEALTH_URL = `${API_URL}/health`;
}

export const { HEALTH_URL } = HealthUrls;
