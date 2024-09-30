import { GetTeamRequestBody } from "../Types/requests";
import { getAPIOrigin } from "../Utils/getOrigin";

export default class AccountService {
  static API_URL = getAPIOrigin() + "/api/v2";

  static async getTeam(teamName: string) {
    const response = await fetch(this.API_URL + "/team/" + teamName, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Hack-Arena-API-Key": "freeW!sh64",
      },
    });

    return response;
  }

  static async updateTeam(teamName: string, teamData: any) {
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
