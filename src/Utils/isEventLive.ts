import { eventStartDate, eventEndDate } from "../Constants/Constants";

const isEventLive = (): boolean => {
    const today = new Date();
    const eventLive = today >= eventStartDate && today <= eventEndDate;
    return eventLive;

}

export default isEventLive;