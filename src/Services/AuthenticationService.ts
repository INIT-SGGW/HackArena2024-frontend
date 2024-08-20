import { RegisterBody, LoginBody, ResetPasswordBody, InputTeam } from "../Types/types";

export default class AuthenticationService {
  static API_URL = process.env.REACT_APP_API_URL;

  static async login({ email, password }: LoginBody) {
    const response = await fetch(this.API_URL + "/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Hack-Arena-API-Key": process.env.REACT_APP_API_KEY || "",
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  }

  static async register(registerBody: InputTeam) {
    const response = await fetch(this.API_URL + "/register", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Hack-Arena-API-Key": process.env.REACT_APP_API_KEY || "",
      },
      body: JSON.stringify(registerBody),
    });
    return response;
  }

  static async logout() {
    const response = await fetch(this.API_URL + "/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Hack-Arena-API-Key": process.env.REACT_APP_API_KEY || "",
      },
    });
    return response;
  }

  static async resetPassword({ password }: ResetPasswordBody) {
    const teamID = localStorage.getItem("teamID");
    const response = await fetch(
      this.API_URL + "/" + teamID + "/changepassword",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Hack-Arena-API-Key": process.env.REACT_APP_API_KEY || "",
        },
        body: JSON.stringify({ password }),
      }
    );
    return response;
  }
}
