import { PageMetaText } from "../../Types/types"

export interface PageText extends PageMetaText {
    title: string;
    teamMembers: string
    teamMember: string
    registerFields: {
        firstName: {
            label: string
            name: string
            id: string
            errorMessage: string
        },
        lastName: {
            label: string
            name: string
            id: string
            errorMessage: string
        },
        email: {
            label: string
            name: string
            id: string
            errorMessage: string
        },
        dateOfBirth: {
            label: string
            name: string
            id: string
            errorMessage: string
        },
        occupation: {
            label: string
            name: string
            id: string
            occupationChoices: string[]
            errorMessage: string
        },
        teamName: {
            label: string
            name: string
            id: string
            errorMessage: string
        },
        vegan: {
            label: string
            name: string
            id: string
            errorMessage: string
        },
        agreement: {
            label: string
            name: string
            id: string
            errorMessage: string
        },
    },
    buttons: {
        save: {
            active: string
            disabled: string
        },
        "edit-cancel": {
            active: string
            disabled: string
        },
        addTeamMember: string
        deleteTeamMember: string
        resetPassword: string
        deleteTeam: string
        logout: string
    },
    alert: {
        title: string
        message: string
        buttons: {
            delete: string
            cancel: string
        }
    }
}