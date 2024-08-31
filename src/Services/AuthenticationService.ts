import { ChangePasswordRequest, ForgotPasswordRequest, LoginRequest, RegisterTeamMemberRequest, RegisterTeamRequest, ResetPasswordRequest } from "../Types/requests"

export default class AuthenticationService {
  static API_URL = process.env.REACT_APP_API_URL;

  static async registerTeam(body: RegisterTeamRequest) {
    const response = await fetch(this.API_URL + "/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  static async registerTeamMember(body: RegisterTeamMemberRequest) {
    const response = await fetch(this.API_URL + "/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  }


  static async login(body: LoginRequest) {
    const response = await fetch(this.API_URL + "/login", {
      method: "POST",
      mode: "cors",
      headers: {
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
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  static async forgotPassword(body: ForgotPasswordRequest) {
    const response = await fetch(this.API_URL + "/forgotpassword", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  static async changePassword(body: ChangePasswordRequest) {
    const response = await fetch(this.API_URL + "/changepassword", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response
  }

  static async resetPassword(body: ResetPasswordRequest) {
    const teamID = localStorage.getItem("teamID");
    const response = await fetch(
      this.API_URL + "/" + teamID + "/changepassword",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  }
}
