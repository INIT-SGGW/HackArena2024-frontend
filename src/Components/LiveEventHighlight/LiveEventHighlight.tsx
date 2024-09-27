import React from 'react'
import './LiveEventHighlight.css'
import getEventStatus, { EventStatus } from '../../Utils/getEventStatus'
import text from '../../Assets/text.json'
import replacePlaceholders from '../../Utils/replacePlaceholders'
import dateFormat, { DateFormat } from '../../Utils/dateFormat'
import { eventStartDate, registrationEndDate } from '../../Constants/Dates'
import useTimeToEvent from '../../Hooks/useTimeToEvent'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'

interface ComponentText {
    title: {
        eventLive: string,
        eventDone: string,
        closeToRegistration: string
    },
    description: string,
    button: string
}


function LiveEventHighlight() {
    const componentText: ComponentText = text.liveEventHighlight;
    const timeToEvent = useTimeToEvent();
    const navigate = useNavigate();

    return (
        <div className='LiveEventHighlight'>
            {
                getEventStatus() === EventStatus.EventLive &&
                <div className="home--date home--section">

                    <h3>{componentText.title.eventLive}</h3>
                </div>
            }
            {
                getEventStatus() === EventStatus.EventDone &&
                <div className="home--date home--section">
                    <h3>{componentText.title.eventDone}</h3>
                </div>
            }
            {/* {
          getEventStatus() === EventStatus.RegistrationOpen &&
          <div id='nieczekaj' className="home--dontwait pagewidth home--section">
        <h2 className="header__white">{componentText.dontWait.title}</h2>
        <h4>{componentText.dontWait.description}</h4>
        <p>{replacePlaceholders(componentText.dontWait.dateReminder, dateFormat(registrationEndDate, DateFormat.DATE))}</p>
        <Button onClick={() => navigate("/rejestracja")} className="btn btn__primary-w btn__primary-w-border">{componentText.dontWait.button}</Button>
      </div>
        } */}
            {
                (getEventStatus() === EventStatus.CloseToRegistration ||
                    getEventStatus() === EventStatus.RegistrationOpen ||
                    getEventStatus() === EventStatus.RegistrationClosed) &&
                <div className="home--date home--section">
                    {/* TODO: style home date */}
                    <h3>{replacePlaceholders(
                        componentText.title.closeToRegistration,
                        [dateFormat(eventStartDate, DateFormat.DATE), dateFormat(eventStartDate, DateFormat.TIME)])}
                    </h3>
                    <h2 className="header__yellow">{timeToEvent}</h2>
                    {
                        getEventStatus() === EventStatus.RegistrationOpen &&
                        <div>
                            <p>{replacePlaceholders(componentText.description, dateFormat(registrationEndDate, DateFormat.DATE))}</p>
                            <Button onClick={() => navigate("/rejestracja")} className="btn btn__primary btn__primary-border">{componentText.button}</Button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default LiveEventHighlight