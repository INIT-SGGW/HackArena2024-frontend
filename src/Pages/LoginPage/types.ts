import { PageMetaText } from "../../Types/types"

export interface PageText extends PageMetaText {
    title: string
    form: {
        email: {
            label: string
            placeholder: string
            errorMessage: string
        }
        password: {
            label: string
            placeholder: string
            errorMessage: string
        }
        forgotPassword: {
            label: string
        }
        noAccount: {
            label: string
        }
        rememberMe: {
            label: string
            name: string
            id: string
        }
    }
    button: {
        active: string
        disabled: string
    }
}