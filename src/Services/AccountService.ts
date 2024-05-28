import { AccountTeam } from "../Types/types";

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
}
