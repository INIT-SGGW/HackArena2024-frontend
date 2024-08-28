import { PageMetaText } from "../../Types/types";

export interface PageText extends PageMetaText {
    title: string,
    description: string
    registerFields: {
        firstName: {
            label: string
            placeholder: string
            errorMessage: string
        },
        lastName: {
            label: string
            placeholder: string
            errorMessage: string
        },
        dateOfBirth: {
            label: string
            placeholder: string
            errorMessage: string
        },
        occupation: {
            label: string
            placeholder: string
            occupationOptions: {
                value: string
                text: string
            }[]
            errorMessage: string
        },
        dietPreference: {
            label: string
            placeholder: string
            dietPreferenceOptions: {
                value: string
                text: string
            }[]
            errorMessage: string
        },
        agreement: {
            label: string
            placeholder: string
            errorMessage: string
        }
    },
    button: {
        active: string
        disabled: string
    }
}