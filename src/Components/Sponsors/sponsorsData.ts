import { SponsorData } from "./types";

import FabbricaLogo from "../../Assets/Sponsors/fabbrica.webp";
import UlandLogo from "../../Assets/Sponsors/uland.png";
import StudentNewsLogo from "../../Assets/Sponsors/studentnews.png";
import MamStartupLogo from "../../Assets/Sponsors/mamstartup.svg";
import JustJoinITLogo from "../../Assets/Sponsors/justjoin.png";
import CrossWebLogo from "../../Assets/Sponsors/crossweb.svg";
import ScrumDoLogo from "../../Assets/Sponsors/scrumdo.png";
import KochamSkakacLogo from "../../Assets/Sponsors/kochamskakac.png";
import MevSpaceLogo from "../../Assets/Sponsors/mevspace.svg";
import UrsynowLogo from "../../Assets/Sponsors/ursynow.jpg";
import CosomoEyeLogo from "../../Assets/Sponsors/cosmoeye.svg";
import SGGWLogo from "../../Assets/sggw_logo_white.png";
import CoffeeHeroesRosteryLogo from "../../Assets/Sponsors/coffee_heroes_roastery.png";

const SponsorsData: SponsorData = {
    sponsors: [
        {
            name: "MevSpace",
            logo: MevSpaceLogo,
            url: "https://mevspace.com/"
        },
        {
            name: "Kocham Skakać",
            logo: KochamSkakacLogo,
            url: "https://kochamskakac.pl/"
        },
        {
            name: "CosmoEye",
            logo: CosomoEyeLogo,
            url: "https://cosmoeye.ai/"
        }
    ],
    partners: [
        {
            name: "Fabbrica",
            logo: FabbricaLogo,
            url: "https://www.fabbrica.pl/",
            height: 60
        },
        {
            name: "Uland",
            logo: UlandLogo,
            url: "https://www.uland.pl/",
            height: 60
        },
        {
            name: "Coffee Heroes Rostery",
            logo: CoffeeHeroesRosteryLogo,
            height: 60
        }

    ],
    mediaPatronage: [
        {
            name: "Grupa StudentNews",
            logo: StudentNewsLogo,
            url: "https://grupa.studentnews.pl/"
        },
        {
            name: "Mam Startup",
            logo: MamStartupLogo,
            url: "https://mamstartup.pl/"
        },
        {
            name: "Just Join IT",
            logo: JustJoinITLogo,
            url: "https://justjoin.it/"
        },
        {
            name: "Crossweb",
            logo: CrossWebLogo,
            url: "https://crossweb.pl/"
        },
        {
            name: "ScrumDo",
            logo: ScrumDoLogo,
            url: "https://scrumdo.pl/"
        }
    ],
    patronage: [
        {
            name: "Patronat honorowy Burmistrza dzielnicy Ursynów",
            logo: UrsynowLogo,
            url: "https://ursynow.um.warszawa.pl/",
            height: 60
        },
        {
            name: "Patronat honorowy Rektora Szkoły Głównej Gospodarstwa Wiejskiego",
            logo: SGGWLogo,
            url: "https://www.sggw.edu.pl/",
            height: 60
        }
    ]
}

export default SponsorsData;