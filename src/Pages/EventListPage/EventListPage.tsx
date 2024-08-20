import React from 'react'
import './EventListPage.css'
import HackArena1_0Image from "../../Assets/hackarena_1_0_bw.jpg"
import EventBgImage from "../../Assets/bg-event.png"
import HackArena2_0Image from "../../Assets/hackarena_2_0_bw.jpg"
import { useNavigate } from 'react-router-dom'

function EventListPage() {
    const navigate = useNavigate()

    return (
        <div className='events pagewidth'>
            <div className='events__header'>
                <h1 className='header__yellow header__wider header__taller'>Wydarzenia</h1>
            </div>
            <h3 className='header__yellow'>Nadchodzące</h3>
            <div className='events__group events__group--present'>
                <div onClick={() => navigate("/wydarzenia/hackarena2_0")}>
                    <img src={HackArena2_0Image} alt="Hackarena 2.0 banner" />
                    <h4 className='header__yellow'>HackArena 2.0</h4>
                </div>
            </div>
            <h3 className='header__white'>Zakończone</h3>
            <div className='events__group events__group--past'>
                <div onClick={() => navigate("/wydarzenia/hackarena1_0")}>
                    <img src={HackArena1_0Image} alt="Hackarena 2.0 banner" />
                    <h4 className='header__white'>HackArena 1.0</h4>
                </div>
            </div>
        </div>
    )
}

export default EventListPage