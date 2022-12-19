import { AuthModel, AccountModelProps } from "../models";
import { SERVER_URL } from "../Config";

export class AuthProvider {
  static async login(auth: AuthModel): Promise<Response> {
    let res = await fetch(`${SERVER_URL}/auth/login`, {
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

  static async signUp(auth: AuthModel): Promise<Response> {
    let res = await fetch(`${SERVER_URL}/auth/signup`, {
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
    let res = await fetch(`${SERVER_URL}/auth/client`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  }
}
