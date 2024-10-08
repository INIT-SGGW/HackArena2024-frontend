import React, { useEffect, TouchEvent } from 'react'
import './EventPage.css'
import { NavigateFunction, useParams } from 'react-router-dom'
import text from '../../Assets/text.json'
import { useNavigate } from 'react-router-dom'
import TitleAndDesc from '../../Components/TitleAndDesc/TitleAndDesc'
import HackarenaFormatImage from "../../Assets/HackArena2_0Format.svg"
import FAQComponent from '../../Components/FAQ/FAQ'
import { CheckEventStatusData, FinishedEventData, isFinishedEventData, isUpcomingEventData, PageText, UpcomingEventData } from './types'
import CloseIcon from "../../Assets/close-cross.svg"
import ChevronIcon from "../../Assets/chevron-down.svg"
import Page from '../../Components/Page/Page'
import { getAPIOrigin } from '../../Utils/getOrigin'
import replacePlaceholders from '../../Utils/replacePlaceholders'
import { eventStartDate, registrationEndDate, registrationStartDate } from '../../Constants/Dates'
import dateFormat, { DateFormat } from '../../Utils/dateFormat'
import Sponsors from '../../Components/Sponsors/Sponsors'
import getEventStatus, { EventStatus } from '../../Utils/getEventStatus'
import Button from '../../Components/Button/Button'

const AllEventsData: { [key: string]: any } = {
    "hackarena1_0": {
        "finished": true,
        "banner": {
            "title": "HackArena 1.0",
            "date": "02.06.2024 na SGGW w Warszawie",
            "description": "HackArena 1.0 to pierwsza edycja hackathonu organizowanego przez Koło Naukowe \"init\". W wydarzeniu wzięło udział 15 osób, które stworzyły 6 botów."
        },
        "highlightInfo": "Dziękujemy za udział wszystkim uczestnikom",
        "task": {
            "title": "Zadanie",
            "description": "Drużyny dostały zadanie stworzenie bota do gry typu <b>Bomberman.</b> Do wykonania zadania należało wykorzystać <b>język Python</b> i należało się zmieścić w czasie <b>8 godzin.</b>"
        },
        "results": {
            "title": "Wyniki",
            "description": "Podium pierwszej edycji HackAreny",
            "firstPlace": "Pierwsze miejsce",
            "secondPlace": "Drugie miejsce",
            "teams": {
                "firstPlace": "Wild Pythons",
                "secondPlace": "Essanse of Code"
            }
        },

        "photos": {
            "title": "Zdjęcia",
            "list": [
                // getAPIOrigin() + '/HackArena1/DSC_6107',
                // getAPIOrigin() + '/HackArena1/DSC_6131',
                // getAPIOrigin() + '/HackArena1/DSC_6132',
                // getAPIOrigin() + '/HackArena1/DSC_6144',
                // getAPIOrigin() + '/HackArena1/DSC_6158',
                // getAPIOrigin() + '/HackArena1/DSC_6165',
                // getAPIOrigin() + '/HackArena1/DSC_6172',
                // getAPIOrigin() + '/HackArena1/DSC_6173',
                // getAPIOrigin() + '/HackArena1/DSC_6184',
                // getAPIOrigin() + '/HackArena1/DSC_6187',
                // getAPIOrigin() + '/HackArena1/DSC_6190',
                // getAPIOrigin() + '/HackArena1/DSC_6222',
                // getAPIOrigin() + '/HackArena1/DSC_6226',
                // getAPIOrigin() + '/HackArena1/DSC_6228',
                // getAPIOrigin() + '/HackArena1/DSC_6235',
                // getAPIOrigin() + '/HackArena1/DSC_6242',
                // getAPIOrigin() + '/HackArena1/DSC_6245',
                // getAPIOrigin() + '/HackArena1/DSC_6248',
                // getAPIOrigin() + '/HackArena1/DSC_6251',
                // getAPIOrigin() + '/HackArena1/DSC_6268',
                // getAPIOrigin() + '/HackArena1/DSC_6284',
                // getAPIOrigin() + '/HackArena1/DSC_6294',
                // getAPIOrigin() + '/HackArena1/DSC_6588',
                // getAPIOrigin() + '/HackArena1/DSC_6590',
                // getAPIOrigin() + '/HackArena1/DSC_6597',
                // getAPIOrigin() + '/HackArena1/DSC_6605',
                // getAPIOrigin() + '/HackArena1/DSC_6606',
                // getAPIOrigin() + '/HackArena1/DSC_6608',
                // getAPIOrigin() + '/HackArena1/DSC_6613',
                // getAPIOrigin() + '/HackArena1/DSC_6623',
                // getAPIOrigin() + '/HackArena1/DSC_6629',
                // getAPIOrigin() + '/HackArena1/DSC_6631',
                // getAPIOrigin() + '/HackArena1/DSC_6638',
                // getAPIOrigin() + '/HackArena1/DSC_6639',
                // getAPIOrigin() + '/HackArena1/DSC_6640',
                // getAPIOrigin() + '/HackArena1/DSC_6642',
                // getAPIOrigin() + '/HackArena1/DSC_6645',
                // getAPIOrigin() + '/HackArena1/DSC_6650',
                // getAPIOrigin() + '/HackArena1/DSC_6652',
                // getAPIOrigin() + '/HackArena1/DSC_6654',
                // getAPIOrigin() + '/HackArena1/DSC_6664',
                // getAPIOrigin() + '/HackArena1/DSC_6669'
                '/Assets/HackArena1/DSC_6107',
                '/Assets/HackArena1/DSC_6131',
                '/Assets/HackArena1/DSC_6132',
                '/Assets/HackArena1/DSC_6144',
                '/Assets/HackArena1/DSC_6158',
                '/Assets/HackArena1/DSC_6165',
                '/Assets/HackArena1/DSC_6172',
                '/Assets/HackArena1/DSC_6173',
                '/Assets/HackArena1/DSC_6184',
                '/Assets/HackArena1/DSC_6187',
                '/Assets/HackArena1/DSC_6190',
                '/Assets/HackArena1/DSC_6222',
                '/Assets/HackArena1/DSC_6226',
                '/Assets/HackArena1/DSC_6228',
                '/Assets/HackArena1/DSC_6235',
                '/Assets/HackArena1/DSC_6242',
                '/Assets/HackArena1/DSC_6245',
                '/Assets/HackArena1/DSC_6248',
                '/Assets/HackArena1/DSC_6251',
                '/Assets/HackArena1/DSC_6268',
                '/Assets/HackArena1/DSC_6284',
                '/Assets/HackArena1/DSC_6294',
                '/Assets/HackArena1/DSC_6588',
                '/Assets/HackArena1/DSC_6590',
                '/Assets/HackArena1/DSC_6597',
                '/Assets/HackArena1/DSC_6605',
                '/Assets/HackArena1/DSC_6606',
                '/Assets/HackArena1/DSC_6608',
                '/Assets/HackArena1/DSC_6613',
                '/Assets/HackArena1/DSC_6623',
                '/Assets/HackArena1/DSC_6629',
                '/Assets/HackArena1/DSC_6631',
                '/Assets/HackArena1/DSC_6638',
                '/Assets/HackArena1/DSC_6639',
                '/Assets/HackArena1/DSC_6640',
                '/Assets/HackArena1/DSC_6642',
                '/Assets/HackArena1/DSC_6645',
                '/Assets/HackArena1/DSC_6650',
                '/Assets/HackArena1/DSC_6652',
                '/Assets/HackArena1/DSC_6654',
                '/Assets/HackArena1/DSC_6664',
                '/Assets/HackArena1/DSC_6669'
            ]
        }
    },
    "hackarena2_0":
    {
        "finished": false,
        "banner": {
            "title": "HackArena 2.0",
            "date": "26-27.10.2024 na SGGW w Warszawie",
            "description": "Druga edycja hackathonu organizowanego przez Koło Naukowe \"init\". W tej edycji weźmie udział aż 16 drużyn po 3 osoby każda, a na zwycięzców czekają nagrody o łącznej wartości 6000 zł."
        },
        "clock": "Początek rejestracji od 01.09.2024",
        "generalInformation": {
            "title": "Informator",
            "description": "W wydarzeniu weźmie udział <b>16 zespołów</b>, każdy składający się z <b>2 lub 3 osób.</b> Wydarzenie będzie trwało przez <b>dwa dni</b> na SGGW w Warszawie w budynku numer 34 <b>(ul. Nowoursynowska 159).</b> W ciągu dnia zostaną udostępnione sale oraz będzie zapewnione jedzenie, ale <b>nie organizujemy noclegu dla uczestników.</b>"
        },
        "task": {
            "title": "Zadanie",
            "description": "Waszym zadaniem będzie <b>stworzenie bota</b> do gry, która zostanie ujawniona w dniu rozpoczęcia HackAreny. W maksymalnie <b>3 osobowych grupach</b> będziecie mieli 2 dni na implementację algorytmu zdolnego do samodzielnego przeprowadzenia rozgrywki. Swoje rozwiązanie będzicie mogli napisać w <b>Python, Java, C#, C++, JavaScript, TypeScript, Go i Rust.</b> Na koniec wydarzenia zostanie przeprowadzony <b>turniej, który wyłoni zwycięską drużynę.</b>"
        },
        "format": {
            "title": "Format turnieju",
            "description": "Turniej zostanie rozegrany <b>w trzech rundach.</b> W każdej rundzie będziecię się zmagali w <b>pojedynku 1v1v1v1</b> - wasz bot przeciwko trzem innym. W pierwszym etapie, przydział do poszczególnych meczów będzie roztrzygnięty poprzez <b>losowanie.</b> Następnie w celu przejścia do kolejnych faz, wasz bot musi się znaleźć w <b>top 2 aktualnie rozgrywanego starcia.</b>  W wielkim finale, spośród 4 finalistów, zostanie wyłoniony <b>mistrz HackAreny 2.0.</b>"
        },
        "faq": {
            "title": "FAQ",
            "questions": [
                {
                    "question": "Czym jest hackathon?",
                    "answer": "Hackathon to wydarzenie, na którym w określonym czasie musisz wykonać podane zadanie programistyczne. W naszym przypadku będzie to stworzenie bota do gry."
                },
                {
                    "question": "Czy mogę przyjść sam?",
                    "answer": "Nie, dopuszczamy jedynie zespoły składające się z 2 lub 3 osób"
                },
                {
                    "question": "Gdzie odbędzie się HackArena?",
                    "answer": "HackArena odbędzie się w Auli Kryształowej kampusu SGGW w Warszawie. Adres: ul. Nowoursynowska 166, budynek 9, Warszawa."
                },
                {
                    "question": "Czy będzie zapewnione wyżywienie?",
                    "answer": "Tak, zapewniamy podstawowe wyżywienie. Przez cały czas trwania HackAreny będzie dostępna woda, drobne przekąski oraz dwa posiłki (śniadanie oraz pizza). Jeżeli jesteś wege, zaznacz odpowiednią opcję w formularzu rejestracyjnym."
                },
                {
                    "question": "Czy muszę przynieść własny komputer?",
                    "answer": "Tak, każdy uczestnik musi przynieść własny komputer. Zapewniamy jedynie miejsce do pracy, zasilanie oraz internet."
                },

                {
                    "question": "Czy mogę przyjść z gotowym projektem?",
                    "answer": "Nie, projekty muszą być tworzone od zera."
                }
            ]
        }
    }
}

const PhotoGallery = ({ photos }: { photos: string[] }) => {
    const [isZoomed, setIsZoomed] = React.useState<boolean>(false)
    const [currentPhoto, setCurrentPhoto] = React.useState<number>(0)
    const CarouselRef = React.useRef<HTMLDivElement>(null)
    const [touchStart, setTouchStart] = React.useState(0)
    const [touchEnd, setTouchEnd] = React.useState(0)

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                handleNextPhoto()
            } else if (event.key === 'ArrowLeft') {
                handlePreviousPhoto()
            }
        })

        return () => {
            document.removeEventListener('keydown', () => { })
        }
    }, [])

    useEffect(() => {
        if (isZoomed && CarouselRef.current !== null) {
            CarouselRef.current.style.transform = `translateX(-${currentPhoto * 100}vw)`
        }
    }, [currentPhoto])


    const handleNextPhoto = (): void => {
        setCurrentPhoto((prev) => Math.min(prev + 1, photos.length - 1))
    }

    const handlePreviousPhoto = (): void => {
        setCurrentPhoto((prev) => Math.max(prev - 1, 0))
    }

    const handleZoomIn = (photoIndex: number): void => {
        setIsZoomed(true)
        setCurrentPhoto(photoIndex)
    }

    const getPhotoSrcSet = (photo: string): string => {
        const sizes = ["1920", "1440", "1024", "768", "480", "320", "250", "200"]

        return sizes.map((size) => `${photo}/${size}.jpg ${size}w`).join(", ")
    }

    // SWIPE GESTURE DETECTION

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(0) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe) {
            handleNextPhoto()
        } else if (isRightSwipe) {
            handlePreviousPhoto()
        }
    }

    return (
        <div className={`photo-gallery`}>
            {
                photos.map((photo: string, index: number) => (
                    <img
                        key={index}
                        src={`${photo + "/480.jpg"}`}
                        sizes={`(max-width: 395px) 100vw, (max-width: 572px) 50vw, (max-width: 768px) 33vw, 350px`}
                        srcSet={getPhotoSrcSet(photo)}
                        alt={`photo ${index}`}
                        onClick={() => handleZoomIn(index)}
                    />
                ))
            }

            <div className={`photo-gallery__zoom${isZoomed ? " photo-gallery__zoom--visible" : ""}`} >
                <div className='photo-gallery__controls'>
                    <img src={CloseIcon} alt="close" onClick={() => setIsZoomed(false)} />
                    <div>
                        <img src={ChevronIcon} className={`${currentPhoto > 0 ? "" : "hidden"}`} alt="left" onClick={() => handlePreviousPhoto()} />
                        <img src={ChevronIcon} className={`${currentPhoto < photos.length - 1 ? "" : "hidden"}`} alt="right" onClick={() => handleNextPhoto()} />
                    </div>
                </div>
                <div className='photo-gallery__carousel' ref={CarouselRef}>
                    {
                        photos.map((photo: string, index: number) => (
                            <div key={index} className='photo-gallery__photo-wrapper'>
                                <img
                                    src={`${photo + "/1024.jpg"}`}
                                    srcSet={getPhotoSrcSet(photo)}
                                    sizes="(max-width: 1000px) 100vw, 80vw"
                                    alt={`photo ${index}`}
                                    onTouchStart={onTouchStart}
                                    onTouchMove={onTouchMove}
                                    onTouchEnd={onTouchEnd}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

function EventPage(): JSX.Element {
    const navigate: NavigateFunction = useNavigate()
    const { eventName } = useParams<{ eventName: string }>()
    const [eventData, setEventData] = React.useState<FinishedEventData | UpcomingEventData | null>(null)
    const pageText: PageText = text.event
    const [photos, setPhotos] = React.useState<string[]>([]);


    useEffect(() => {
        if (eventName === undefined) {
            navigate('/404')
        } else {
            //TODO: get event information from backend
            const data: CheckEventStatusData = AllEventsData[eventName];

            if (data.finished) {
                //check what if data is not correct
                setEventData(data as FinishedEventData)

            } else {
                setEventData(data as UpcomingEventData)
            }
        }
    }, [])

    return (
        <Page
            pageTitle={eventData ? eventData.banner.title as string + " | HackArena" : pageText.meta.title}
            description={eventData ? eventData.banner.description as string : pageText.meta.description}
        >

            <div className='event'>

                {
                    (eventData !== null && isFinishedEventData(eventData)) && (
                        <>
                            <div className="event--welcome pagewidth">
                                <h1>{eventData.banner.title}</h1>
                                <span>{eventData.banner.date}</span>
                                <h6>{eventData.banner.description}</h6>
                            </div>
                            <div className='event--clock'>
                                <div className='pagewidth'>
                                    <h4>{eventData.highlightInfo}</h4>
                                </div>
                            </div>
                            <TitleAndDesc text={eventData.task} />
                            <div className="event--section">
                                <h2 className='header__white'>{eventData.results.title}</h2>
                                <span>{eventData.results.description}</span>
                                <ol type="I">
                                    <li>{eventData.results.teams.firstPlace}</li>
                                    <li>{eventData.results.teams.secondPlace}</li>
                                </ol>
                            </div>
                            <div className='event--section event--section__photos'>
                                <h2 className='header__white'>{pageText.photos}</h2>
                                <PhotoGallery photos={eventData.photos.list} />
                            </div>
                        </>
                    )
                }
                {
                    (eventData !== null && isUpcomingEventData(eventData)) &&
                    (
                        <>
                            <div className="event--welcome pagewidth">
                                <h1>{eventData.banner.title}</h1>
                                <span>{eventData.banner.date}</span>
                                <h6>{eventData.banner.description}</h6>
                            </div>

                            <div className='event--clock'>
                                <div className='pagewidth'>
                                    {
                                        getEventStatus() === EventStatus.CloseToRegistration &&
                                        <h4>{eventData.clock}</h4>
                                    }
                                    {
                                        getEventStatus() === EventStatus.RegistrationOpen &&
                                        <h4>{replacePlaceholders("Rejestracja otwarta do {0}", [dateFormat(registrationEndDate, DateFormat.DATE)])}</h4>
                                    }
                                    {
                                        getEventStatus() === EventStatus.EventLive &&
                                        <h4>HackArena w trakcie!</h4>
                                    }
                                    {
                                        getEventStatus() === EventStatus.EventDone &&
                                        <h4>Dziękujemy za udział</h4>
                                    }
                                </div>
                            </div>
                            <TitleAndDesc text={eventData.generalInformation} />
                            <div className='prizes pagewidth event--section'>
                                <div className='prizes__header'>
                                    <h2 className='header__white'>Nagrody</h2>
                                    <span>Wszyscy uczestnicy otrzymają giftbagi na początku wydarzenia</span>

                                </div>
                                <ul className='prizes__podium'>
                                    <li className='prizes__standing prizes__standing--second'>
                                        <h4>Drugie miejsce</h4>
                                        <ul>
                                            <li>Mysz Logitech G Pro X Superlight</li>
                                            <li>Podkładka SteelSeries Qck Edge</li>
                                        </ul>
                                    </li>
                                    <li className='prizes__standing prizes__standing--first'>
                                        <h4>Pierwsze miejsce</h4>
                                        <ul>
                                            <li>Słuchawki Logitech G Pro X</li>
                                            <li>Mysz Logitech G Pro X Superlight</li>
                                            <li>Podkładka SteelSeries Qck Edge</li>
                                        </ul>
                                    </li>
                                    <li className='prizes__standing prizes__standing--third'>
                                        <h4>Trzecie miejsce</h4>
                                        <ul>
                                            <li>Mysz SteelSeries Rival 5</li>
                                            <li>Podkładka SteelSeries Qck Edge</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <TitleAndDesc text={eventData.task} />
                            <TitleAndDesc text={eventData.format} />
                            <div className='event--format pagewidth'>
                                <img src={HackarenaFormatImage} alt="HackArena 2.0 format" />
                            </div>
                            <div className='event--section'>
                                <Sponsors />
                            </div>
                            <div className="event--section pagewidth">
                                <h2 className='header__white'>{eventData.faq.title}</h2>
                                <FAQComponent questions={eventData.faq.questions} />
                            </div>


                            {/* <div className="event--section">
                                <h2>{eventText.results.title}</h2>
                                <span>{eventText.results.description}</span>
                                <ol type="I">
                                    <li>{eventText.results.teams.firstPlace}</li>
                                    <li>{eventText.results.teams.secondPlace}</li>
                                </ol>
                            </div> */}

                        </>
                    )

                }
            </div>
        </Page>

    )
}

export default EventPage