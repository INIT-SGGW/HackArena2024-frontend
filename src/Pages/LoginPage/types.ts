import { PageMetaText } from "../../Types/types"

export interface PageText extends PageMetaText {
    title: string
    loginFields: {
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
        acitve: string
        disabled: string
    }
}