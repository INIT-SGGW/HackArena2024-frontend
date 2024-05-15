const isEventLive = (eventStart: Date, eventEnd: Date): boolean => {
    const today = new Date();
    const eventLive = today >= eventStart && today <= eventEnd;
    return eventLive;

}

export default isEventLive;