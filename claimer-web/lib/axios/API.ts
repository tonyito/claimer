import axios, { AxiosResponse } from "axios";

axios.defaults.withCredentials = true;

export default class API {
  public static async GET<T>(
    url: string,
    options?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    try {
      return await axios.get<T>(url, options);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const { GET } = API;
