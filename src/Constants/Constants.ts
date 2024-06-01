// Dates Constants
const today = new Date();
const startDate = process.env.REACT_APP_EVENT_START_DATE || "2024-06-02T09:20:00+02:00";
const endDate = process.env.REACT_APP_EVENT_END_DATE || "2024-06-02T18:30:00+02:00";
const future = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 2,
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
);
const past = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 2,
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
);
const regitrationEndDate = process.env.REACT_APP_REGISTRATION_END_DATE ||
    "2024-06-08T10:00:00+02:00";

export const getEventDate = () => {
    let year = eventStartDate.getFullYear().toString();
    let month = (eventStartDate.getMonth() + 1).toString();
    month = month.length === 1 ? `0${month}` : month;
    let days = eventStartDate.getDate().toString();
    days = days.length === 1 ? `0${days}` : days;
    return `${days}.${month}.${year}`;
};

export const getEventTime = () => {
    let hours = eventStartDate.getHours().toString();
    hours = hours.length === 1 ? `0${hours}` : hours;
    let minutes = eventStartDate.getMinutes().toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
};

export const getRegistrationEndDate = () => {
    let year = registrationEndDate.getFullYear().toString();
    let month = (registrationEndDate.getMonth() + 1).toString();
    month = month.length === 1 ? `0${month}` : month;
    let days = registrationEndDate.getDate().toString();
    days = days.length === 1 ? `0${days}` : days;
    return `${days}.${month}.${year}`;
};

type EventDate = {
    future: Date;
    present: Date;
    past: Date;
};

export const eventStartDate: Date = new Date(startDate);
export const eventEndDate: Date = new Date(endDate);
export const registrationEndDate: Date = new Date(regitrationEndDate);