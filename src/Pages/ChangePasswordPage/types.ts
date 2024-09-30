import { PageMetaText } from "../../Types/types";

export interface PageText extends PageMetaText {
    title: string
    formFields: {
        oldPassword: {
            label: string,
            placeholder: string,
            errorMessage: string
        }
        password: {
            label: string,
            placeholder: string,
            errorMessage: string
        }
        repeatPassword: {
            label: string,
            placeholder: string,
            errorMessage: string
        }
    }
    button: {
        active: string
        disabled: string
    }
}


