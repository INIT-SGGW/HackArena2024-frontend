import { PageMetaText } from "../../Types/types";

export interface PageText extends PageMetaText {
    title: string
    formFields: {
        email: {
            label: string
            name: string
            id: string
            errorMessage: string
        }
        password: {
            label: string
            name: string
            id: string
            errorMessage: string
        }
        repeatPassword: {
            label: string
            name: string
            id: string
            errorMessage: string
        }
    }
    button: {
        active: string
        disabled: string
    }
}