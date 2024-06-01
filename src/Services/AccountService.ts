import { AccountTeam, AccountTeamRequestBody } from "../Types/types";

export default class AccountService {
  static API_URL = process.env.REACT_APP_API_URL;

  static async getTeam(teamID: string) {
    const response = await fetch(this.API_URL + "/" + teamID + "/users", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Hack-Arena-API-Key": process.env.REACT_APP_API_KEY || "",
      },
    });

    return response;
  }

  static async updateTeam(teamName: string, teamData: AccountTeamRequestBody) {
    const response = await fetch(this.API_URL + "/" + teamName + "/update", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Hack-Arena-API-Key": process.env.REACT_APP_API_KEY || "",
      },
      body: JSON.stringify(teamData),
    });

    return response;
  }

  static async uploadSolution(teamName: string, solution: File) {
    const formData = new FormData();
    formData.append("file", solution);

    const response = await fetch(this.API_URL + "/" + teamName + "/upload/file", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Hack-Arena-API-Key": process.env.REACT_APP_API_KEY || "",
      },
      body: formData,
    });

    return response;
  }

  static async downloadSolution(teamName: string) {
    const response = await fetch(this.API_URL + "/admin/download/" + teamName + "/file", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Hack-Arena-API-Key": process.env.REACT_APP_API_KEY || "",
      },
    });

    return response;
  }
}
