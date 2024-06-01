import { eventEndDate } from "../Constants/Constants";

const isEventDone = (): boolean => {
    const now = new Date();
    const eventLive = now >= eventEndDate;
    return eventLive;

}

export default isEventDone;