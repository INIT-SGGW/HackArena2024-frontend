import { PageMetaText } from "../../Types/types";

export interface PageText extends PageMetaText {
    title: string
    formFields: {
        email: {
            label: string
            placeholder: string
            errorMessage: string
        }
    }
    button: {
        active: string
        disabled: string
    }
}