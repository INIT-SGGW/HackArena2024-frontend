import React, { useEffect, useState } from 'react'
import './EventListPage.css'
import HackArena1_0Image from "../../Assets/hackarena_1_0_bw.jpg"
import HackArena2_0Image from "../../Assets/hackarena_2_0_bw.jpg"
import { useNavigate } from 'react-router-dom'
import text from '../../Assets/text.json'
import { EventBannerData, EventsData, PageText } from './types'

const events: EventsData = {
    count: 2,
    upcoming: [
        {
            title: "HackArena 2.0",
            date: "2021-10-02",
            banner: HackArena2_0Image,
            url: "/wydarzenia/hackarena2_0"
        }
    ],
    finished: [
        {
            title: "HackArena 1.0",
            date: "2021-06-12",
            banner: HackArena1_0Image,
            url: "/wydarzenia/hackarena1_0"
        }
    ]
}

const EventBanner = ({ image, title, url, isPresent = false }: { image: string, title: string, url: string, isPresent?: boolean }): JSX.Element => {
    const navigate = useNavigate()

    return (
        <div className={`events__group ${isPresent ? "events__group--present" : "events__group--finished"}`}>
            <div onClick={() => navigate(url)}>
                <img src={image} alt={`${title} banner`} />
                <h4 className={`${isPresent ? "header__yellow" : "header__white"}`}>{title}</h4>
            </div>
        </div>
    )
}

function EventListPage(): JSX.Element {
    const pageText: PageText = text.eventList;
    const [eventsData, setEventsData] = useState<EventsData | null>(null)
    useEffect(() => {
        //TODO: get events data from backend
        setEventsData(events);
    })

    return (
        <div className='events pagewidth'>
            <div className='events__header'>
                <h1 className='header__yellow header__wider header__taller'>{pageText.title}</h1>
            </div>
            {
                (eventsData === null || eventsData.count === 0) &&
                <h5 className='events__noevents'>{pageText.noEvents}</h5>
            }
            {
                eventsData !== null && eventsData.count > 0 &&
                <>
                    <h3 className='header__yellow'>{pageText.upcoming}</h3>
                    {
                        eventsData.upcoming.map((event: EventBannerData, index: number) => (
                            <EventBanner key={index} image={event.banner} title={event.title} url={event.url} isPresent={true} />
                        ))
                    }
                    <h3 className='header__white'>{pageText.finished}</h3>
                    {
                        eventsData.finished.map((event: EventBannerData, index: number) => (
                            <EventBanner key={index} image={event.banner} title={event.title} url={event.url} />
                        ))
                    }
                </>
            }
        </div>
    )
}

export default EventListPage