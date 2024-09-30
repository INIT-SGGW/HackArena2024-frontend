import { ChangePasswordRequestBody, ForgotPasswordRequestBody, LoginRequestBody, RegisterTeamMemberRequestBody, RegisterTeamRequestBody, ResetPasswordRequestBody } from "../Types/requests"
import { getAPIOrigin } from "../Utils/getOrigin";

export default class AuthenticationService {
  static API_URL = getAPIOrigin() + "/api/v2";

  static async registerTeam(body: RegisterTeamRequestBody) {
    const response = await fetch(this.API_URL + "/register/team", {
      method: "POST",
      mode: "cors",
      headers: {
        "Hack-Arena-API-Key": "freeW!sh64",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  static async registerTeamMember(body: RegisterTeamMemberRequestBody) {
    const response = await fetch(this.API_URL + "/register/member", {
      method: "POST",
      mode: "cors",
      headers: {
        "Hack-Arena-API-Key": "freeW!sh64",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  }


  static async login(body: LoginRequestBody) {
    const response = await fetch(this.API_URL + "/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Hack-Arena-API-Key": "freeW!sh64",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  }


  static async logout() {
    const response = await fetch(this.API_URL + "/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Hack-Arena-API-Key": "freeW!sh64",
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  static async forgotPassword(body: ForgotPasswordRequestBody) {
    const response = await fetch(this.API_URL + "/password/forgot", {
      method: "POST",
      mode: "cors",
      headers: {
        "Hack-Arena-API-Key": "freeW!sh64",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  static async changePassword(body: ChangePasswordRequestBody) {
    const response = await fetch(this.API_URL + "/password/change", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Hack-Arena-API-Key": "freeW!sh64",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response
  }

  static async resetPassword(body: ResetPasswordRequestBody) {
    const response = await fetch(this.API_URL + "/password/reset",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Hack-Arena-API-Key": "freeW!sh64",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  }
}
