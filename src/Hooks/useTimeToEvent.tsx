import { eventStartDate } from "../Constants/Dates"
import React, { useEffect } from "react"

const calculateTimeLeft = () => {
    let timeLeft = "";
    const now = new Date().getTime();
    const distance = eventStartDate.getTime() - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString();
    days = days.length === 1 ? `0${days}` : days;
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
    hours = hours.length === 1 ? `0${hours}` : hours;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    let seconds = Math.floor((distance % (1000 * 60)) / 1000).toString();
    seconds = seconds.length === 1 ? `0${seconds}` : seconds;
    if (days !== "00") {
        timeLeft = `${days}:${hours}:${minutes}:${seconds}`;
    } else {
        timeLeft = `${hours}:${minutes}:${seconds}`;
    }
    return timeLeft;
}

const useTimeToEvent = () => {
    const [timeLeft, setTimeLeft] = React.useState<string>(calculateTimeLeft());

    useEffect(() => {
        setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000)
    }, [])

    return timeLeft;
}

export default useTimeToEvent;