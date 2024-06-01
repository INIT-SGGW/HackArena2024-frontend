// Dates Constants
const today = new Date();
const eventDuration = 2; // Event Duration in days
//TODO: Change the event start date
const startDate = "2024-06-01T00:00:00+02:00";
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
//TODO: Change the registration end date
const regitrationEndDate =
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
export const eventEndDate: Date = new Date(
    eventStartDate.getFullYear(),
    eventStartDate.getMonth(),
    eventStartDate.getDate() + eventDuration,
    eventStartDate.getHours(),
    eventStartDate.getMinutes(),
    eventStartDate.getSeconds()
);
export const registrationEndDate: Date = new Date(regitrationEndDate);

// Event Start Date - Future, Present, Past
export const eventStartDateTest: EventDate = {
    future: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 2,
        today.getHours(),
        today.getMinutes(),
        today.getSeconds()
    ),
    present: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes(),
        today.getSeconds() - 10
    ),
    past: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 2,
        today.getHours(),
        today.getMinutes(),
        today.getSeconds()
    ),
};

export const eventEndDateTest: EventDate = {
    future: new Date(
        eventStartDateTest.future.getFullYear(),
        eventStartDateTest.future.getMonth(),
        eventStartDateTest.future.getDate() + eventDuration,
        eventStartDateTest.future.getHours(),
        eventStartDateTest.future.getMinutes(),
        eventStartDateTest.future.getSeconds()
    ),
    present: new Date(
        eventStartDateTest.present.getFullYear(),
        eventStartDateTest.present.getMonth(),
        eventStartDateTest.present.getDate() + eventDuration,
        eventStartDateTest.present.getHours(),
        eventStartDateTest.present.getMinutes(),
        eventStartDateTest.present.getSeconds()
    ),
    past: new Date(
        eventStartDateTest.past.getFullYear(),
        eventStartDateTest.past.getMonth(),
        eventStartDateTest.past.getDate() + eventDuration,
        eventStartDateTest.past.getHours(),
        eventStartDateTest.past.getMinutes(),
        eventStartDateTest.past.getSeconds()
    ),
};
