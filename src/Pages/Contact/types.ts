import { PageMetaText } from "../../Types/types";

enum ContactBlockType {
    SOCIAL_MEDIA = "social_media",
    EMAIL = "email"
}

export interface PageText extends PageMetaText {
    title: string
    description: string
    blocks: {
        type: string,
        title: string,
        content: string
        email?: string
    }[]
}