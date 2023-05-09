import axios from "axios";

export enum RequestType {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

abstract class ApiService {
  private static token: string | null = null;
  private BASE_URL: string;

  protected constructor() {
    this.BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
  }

  async request(endpoint: string, data = {}, method = "get") {
    console.debug("API Call:", endpoint, " Payload: ", data, "Method:", method);

    const url = `${this.BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ApiService.token}` };
    const params = method === "get" ? data : {};
    console.log("REQUEST: " + method.toUpperCase() + " " + url);
    try {
      const resp = await axios({ url, method, data, params, headers });
      return resp.data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message = err.response.data.error;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static setToken(token: string) {
    ApiService.token = token;
  }
}

export default ApiService;
