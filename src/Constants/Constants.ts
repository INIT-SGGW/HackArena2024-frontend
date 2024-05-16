// Dates Constants
const today = new Date();
const eventDuration = 2; // Event Duration in days
const startDate = process.env.REACT_APP_EVENT_START_DATE || "2024-06-02T10:00:00+02:00";
const future = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, today.getHours(), today.getMinutes(), today.getSeconds());
const past = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2, today.getHours(), today.getMinutes(), today.getSeconds());


type EventDate = {
    future: Date;
    present: Date;
    past: Date;
};

export const eventStartDate: Date = new Date(future);
export const eventEndDate: Date = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate() + eventDuration, eventStartDate.getHours(), eventStartDate.getMinutes(), eventStartDate.getSeconds());

// Event Start Date - Future, Present, Past
export const eventStartDateTest: EventDate = {
    future: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, today.getHours(), today.getMinutes(), today.getSeconds()),
    present: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds() - 10),
    past: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2, today.getHours(), today.getMinutes(), today.getSeconds())
}

export const eventEndDateTest: EventDate = {
    future: new Date(eventStartDateTest.future.getFullYear(), eventStartDateTest.future.getMonth(), eventStartDateTest.future.getDate() + eventDuration, eventStartDateTest.future.getHours(), eventStartDateTest.future.getMinutes(), eventStartDateTest.future.getSeconds()),
    present: new Date(eventStartDateTest.present.getFullYear(), eventStartDateTest.present.getMonth(), eventStartDateTest.present.getDate() + eventDuration, eventStartDateTest.present.getHours(), eventStartDateTest.present.getMinutes(), eventStartDateTest.present.getSeconds()),
    past: new Date(eventStartDateTest.past.getFullYear(), eventStartDateTest.past.getMonth(), eventStartDateTest.past.getDate() + eventDuration, eventStartDateTest.past.getHours(), eventStartDateTest.past.getMinutes(), eventStartDateTest.past.getSeconds())
}