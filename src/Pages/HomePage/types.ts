import { PageMetaText } from "../../Types/types";

export interface PageText extends PageMetaText {

    welcome: {
        title: string
        description: {
            first: string
            second: string
        }
        buttons: {
            events: string
            aboutUs: string
        }
    }
    date: {
        closeToRegistration: string
        eventLive: string
        eventDone: string
    }
    aboutUs: {
        title: string
        description: string
    }
    nextEvent: {
        title: string
        description: string
        button: string
    }
    agenda: {
        title: string
        schedule:
        {
            time: string
            event: string
        }[]
    }
    dontWait: {
        title: string
        description: string
        dateReminder: string
        button: string
    }
    faq: {
        title: string
        questions:
        {
            question: string
            answer: string
        }[]
    }
}
