import React, { useEffect } from 'react'
import './SocialMedia.css'
import FacebookIcon from "../../Assets/facebook.svg";
import InstagramIcon from "../../Assets/instagram.svg";
import DiscordIcon from "../../Assets/discord.svg";
import LinkedInIcon from "../../Assets/linkedin.svg";

function SocialMedia({ black = false, mobileHeight = false }: { black?: boolean, mobileHeight?: boolean }) {
    const socialRef = React.createRef<HTMLDivElement>()

    const socialMedia = [
        { icon: FacebookIcon, link: "https://www.facebook.com/profile.php?id=61559358943109&is_tour_dismissed", name: "Facebook" },
        { icon: InstagramIcon, link: "https://www.instagram.com/kn_init_/", name: "Instagram" },
        // { icon: DiscordIcon, link: "https://discord.com/invite/YekgmBp9K4", name: "Discord" },
        { icon: LinkedInIcon, link: "https://www.linkedin.com/company/ko%C5%82o-naukowe-init/about/", name: "LinkedIn" }
    ]

    useEffect(() => {
        // Social media icons animation
        // Done in JS so animation doesn't end when mouse leaves the icon

        if (!socialRef.current) return

        const children: HTMLCollection = socialRef.current.children
        for (let i = 0; i < children.length; i++) {
            children[i].addEventListener('mouseenter', () => {
                children[i].classList.add('social-animation')
            })
        }
        for (let i = 0; i < children.length; i++) {
            children[i].addEventListener('animationend', () => {
                children[i].classList.remove('social-animation')
            })
        }

        return () => {
            for (let i = 0; i < children.length; i++) {
                children[i].removeEventListener('mouseover', () => {
                    children[i].classList.add('social-animation')
                })
            }

            for (let i = 0; i < children.length; i++) {
                children[i].removeEventListener('animationend', () => {
                    children[i].classList.remove('social-animation')
                })
            }
        }
    }, [])

    return (
        <div ref={socialRef} className={`social ${mobileHeight ? "social-mobile" : ""}`} style={{ filter: black ? "brightness(0)" : "brightness(1)" }}>
            {
                socialMedia.map((social, index) => {
                    return (
                        <a href={social.link} key={index} >
                            <img src={social.icon} alt={social.name} />
                        </a>
                    )
                })
            }
        </div>
    )
}

export default SocialMedia