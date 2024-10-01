import { registrationEndDate, registrationStartDate, eventEndDate, eventStartDate } from "../Constants/Dates";

export enum EventStatus {
    CloseToRegistration,
    RegistrationOpen,
    RegistrationClosed,
    EventLive,
    EventDone,
    Default
}

const getDaysBetweenDates = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const getEventStatus = () => {
    const currentDate = new Date();
    if (getDaysBetweenDates(currentDate, registrationStartDate) <= 14 && currentDate < registrationStartDate) {
        return EventStatus.CloseToRegistration;
    } else if (currentDate >= registrationStartDate && currentDate < registrationEndDate) {
        return EventStatus.RegistrationOpen;
    } else if (currentDate >= registrationEndDate && currentDate < eventStartDate) {
        return EventStatus.RegistrationClosed;
    } else if (currentDate >= eventStartDate && currentDate <= eventEndDate) {
        return EventStatus.EventLive;
    } else if (getDaysBetweenDates(currentDate, eventEndDate) <= 7) {
        return EventStatus.EventDone;
    } else {
        return EventStatus.Default;
    }
}

export default getEventStatus;
