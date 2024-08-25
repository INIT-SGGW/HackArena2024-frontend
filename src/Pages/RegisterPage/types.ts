import { PageMetaText } from "../../Types/types"

export interface PageText extends PageMetaText {
    closed: {
        title: string,
        description: string
    },
    title: string,
    description: string
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
        password: {
            label: string,
            name: string,
            id: string,
            errorMessage: string
        },
        repeatPassword: {
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
    buttonAddTeamMember: string
    button: {
        active: string
        disabled: string
    }
}