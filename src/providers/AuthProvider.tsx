import { AuthModel, AccountModelProps } from "../models";

export class AuthProvider {
  static async login(auth: AuthModel): Promise<Response> {
    let res = await fetch(`http://localhost:8080/auth/login`, {
      method: "POST",
      headers: {
        //Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    });
    return res;
  }

  static async getClient(accessToken: string): Promise<Response> {
    let res = await fetch(`http://localhost:8080/auth/client`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  }
}
