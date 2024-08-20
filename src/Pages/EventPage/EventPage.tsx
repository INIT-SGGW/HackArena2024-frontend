import React, { useEffect } from 'react'
import './EventPage.css'
import { useParams } from 'react-router-dom'
import text from '../../Assets/text.json'
import { useNavigate } from 'react-router-dom'
import TitleAndDesc from '../../Components/TitleAndDesc/TitleAndDesc'
import HackarenaFormatImage from "../../Assets/HackArena2_0Format.svg"
import FAQComponent from '../../Components/FAQ/FAQ'


interface PageContent {
    banner: {
        title: String;
        date: String;
        description: String;
    },
    task: {
        title: string;
        description: string;
    },
    results: {
        title: String;
        description: String;
        firstPlace: String;
        secondPlace: String;
        teams: {
            firstPlace: String;
            secondPlace: String;
        }
    },
    highlightInfo: string,
    photos: {
        title: String;
    }
}

interface PageContent2 {
    banner: {
        title: String;
        date: String;
        description: String;
    },
    clock: string;
    generalInformation: {
        title: string;
        description: string;
    },
    task: {
        title: string;
        description: string;
    },
    format: {
        title: string,
        description: string
    }
}

interface FaqContent {
    title: string,
    questions: {
        question: string,
        answer: string
    }[]
}

function EventPage() {
    const navigate = useNavigate()
    const { eventName } = useParams<{ eventName: string }>()

    useEffect(() => {
        if (eventName === undefined || eventName !== 'hackarena1_0' && eventName !== 'hackarena2_0') {
            navigate('/404')
        }
    }, [])

    if (eventName === 'hackarena1_0') {
        const eventText: PageContent = text.events.hackarena1_0
        return (
            <div className='event'>
                <div className="event--welcome pagewidth">
                    <h1>{eventText.banner.title}</h1>
                    <span>{eventText.banner.date}</span>
                    <h6>{eventText.banner.description}</h6>
                </div>
                <div className='event--clock'>
                    <div className='pagewidth'>
                        <h4 >{eventText.highlightInfo}</h4>
                    </div>
                </div>
                <TitleAndDesc text={eventText.task} />
                <div className="event--section">
                    <h2 className='header__white'>{eventText.results.title}</h2>
                    <span>{eventText.results.description}</span>
                    <ol type="I">
                        <li>{eventText.results.teams.firstPlace}</li>
                        <li>{eventText.results.teams.secondPlace}</li>
                    </ol>
                </div>
                {/* <div className='events--photos'>
                    <h2>{eventText.photos.title}</h2>
                </div> */}
            </div>
        )
    } else {
        const eventText: PageContent2 = text.events.hackarena2_0
        const faqText: FaqContent = text.home.faq

        return (
            <div className='event'>
                <div className="event--welcome pagewidth">
                    <h1>{eventText.banner.title}</h1>
                    <span>{eventText.banner.date}</span>
                    <h6>{eventText.banner.description}</h6>
                </div>
                <div className='event--clock'>
                    <div className='pagewidth'>
                        <h4>{eventText.clock}</h4>
                    </div>
                    {/* // isEventLive() ?
                        // <>
                        //     <h3>{homeText.date.textLiveEvent}</h3>
                        // </>
                        // :
                        // isEventDone() ?
                        //     <>
                        //     <h3>{homeText.date.textAfterEvent}</h3>
                        //     </> :
                        //     <>
                        //     <h3>{homeText.date.text.first} {getEventDate()} {homeText.date.text.second} {getEventTime()}</h3>
                        //     <h1>{timeToEvent}</h1>
                        //     </> */}

                </div>
                <TitleAndDesc text={eventText.generalInformation} />
                <TitleAndDesc text={eventText.task} />
                <TitleAndDesc text={eventText.format} />
                <div className='event--format pagewidth'>
                    <img src={HackarenaFormatImage} alt="HackArena 2.0 format" />
                </div>
                <div className="event--section pagewidth">
                    <h2 className='header__white'>{faqText.title}</h2>
                    <FAQComponent text={faqText} />
                </div>


                {/* <div className="event--section">
                    <h2>{eventText.results.title}</h2>
                    <span>{eventText.results.description}</span>
                    <ol type="I">
                        <li>{eventText.results.teams.firstPlace}</li>
                        <li>{eventText.results.teams.secondPlace}</li>
                    </ol>
                </div> */}

            </div>
        )
    }
}

export default EventPage