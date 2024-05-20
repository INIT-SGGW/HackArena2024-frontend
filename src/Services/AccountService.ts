import { AccountTeam } from "../Types/types";

export default class AuthenticationService {
    static API_URL = process.env.REACT_APP_API_URL;

    static async getTeam(teamID: string | undefined): Promise<AccountTeam> {
        if (teamID) {
            const response = await fetch(this.API_URL + "/" + teamID + "/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Hack-Arena-API-Key": "$illyGame11"
                }
            });

            return response.json();
        }
        return { teamName: "", teamMembers: [] };
    }
}