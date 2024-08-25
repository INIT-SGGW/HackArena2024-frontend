import { PageMetaText } from "../../Types/types"

export interface PageText extends PageMetaText {
    title: string
    description: string
    buttons: {
        home: string
        goBack: string
    }
}