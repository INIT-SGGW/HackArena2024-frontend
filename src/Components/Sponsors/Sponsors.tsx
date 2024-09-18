import React from 'react'
import './Sponsors.css'
import SponsorsData from './sponsorsData'
import { ComponentText, Sponsor } from './types'
import text from '../../Assets/text.json'

function SponsorSection({ title, sponsors }: { title: string, sponsors: { name: string, logo: string, url: string, height?: number }[] }) {
    return (
        <div className="sponsors__section">
            <h2 className="header__white">{title}</h2>
            <div>
                {
                    sponsors.map((sponsor, index) => {
                        return <a key={index} href={sponsor.url} target="_blank" rel="noreferrer">
                            <img src={sponsor.logo} title={sponsor.name} alt={sponsor.name} style={sponsor.height ? { height: `${sponsor.height}px` } : {}} />
                        </a>
                    })
                }
            </div>
        </div>
    )
}

function Sponsors() {
    const componentText: ComponentText = text.sponsors;

    return (
        <div className="sponsors">
            <SponsorSection title={componentText.titles.sponsors} sponsors={SponsorsData.sponsors} />
            <SponsorSection title={componentText.titles.partners} sponsors={SponsorsData.partners} />
            <SponsorSection title={componentText.titles.patronage} sponsors={SponsorsData.patronage} />
            <SponsorSection title={componentText.titles.mediaPatronage} sponsors={SponsorsData.mediaPatronage} />
        </div>
    )
}


export default Sponsors