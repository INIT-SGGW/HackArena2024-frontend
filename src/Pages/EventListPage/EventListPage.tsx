import React from 'react'
import './EventListPage.css'
import HackArena1_0Image from "../../Assets/hackarena_1_0_bw.jpg"
import EventBgImage from "../../Assets/bg-event.png"
import { useNavigate } from 'react-router-dom'

function EventListPage() {
    const navigate = useNavigate()

    return (
        <div className='events pagewidth'>
            <h1>Wydarzenia</h1>
            <h3>Nadchodzące</h3>
            <div>
                <div onClick={() => navigate("/wydarzenia/hackarena2_0")}>
                    <img src={EventBgImage} alt="Hackarena 2.0 banner" />
                    <h4>HackArena 2.0</h4>
                </div>
            </div>
            <h3>Zakończone</h3>
            <div>
                <div onClick={() => navigate("/wydarzenia/hackarena1_0")}>
                    <img src={HackArena1_0Image} alt="Hackarena 2.0 banner" />
                    <h4>HackArena 1.0</h4>
                </div>


            </div>
        </div>
    )
}

export default EventListPage