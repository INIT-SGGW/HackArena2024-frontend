import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import text from "../../Assets/text.json";
import FacebookIcon from "../../Assets/facebook.svg";
import InstagramIcon from "../../Assets/instagram.svg";
import DiscordIcon from "../../Assets/discord.svg";
import LinkedInIcon from "../../Assets/linkedin.svg";

interface Props { }

function Footer(props: Props) {
  const navItems = text.nav.navItems;
  return <div className="footer">
    <div className="footer--upper">
      <a href="/#welcome">
        <img src={Logo} alt="HackArena" />
      </a>


      <nav className="footer--nav">
        <Link
          to="/rejestracja"
          className="navbar__link navbar__link--special"
        >
          {navItems[0]}
        </Link>
        <Link
          to="/wydarzenia"
          className="navbar__link"
        >
          {navItems[1]}
        </Link>
        {navItems.slice(2, navItems.length).map((item, index) => {
          return (
            <a
              key={index}
              href={`/#${item.toLowerCase()}`}
              className="navbar__link"
            >
              {item}
            </a>
          );
        })}
        {/* <Link
            to="/login"
            className="navbar__link"
          >
            {navItems[navItems.length - 1]}
          </Link> */}

      </nav>

    </div>
    <div className="divider" />
    <div className="footer--social">
      <a href="https://www.facebook.com/profile.php?id=61559358943109&is_tour_dismissed">
        <img src={FacebookIcon} alt="Facebook" />
      </a>
      <a href="https://www.instagram.com/_init_2024/">
        <img src={InstagramIcon} alt="Instagram" />
      </a>
      <a href="https://discord.com/invite/YekgmBp9K4">
        <img src={DiscordIcon} alt="Discord" />
      </a>
      <a href="https://www.linkedin.com/company/ko%C5%82o-naukowe-init/about/">
        <img src={LinkedInIcon} alt="LinkedIn" />
      </a>

    </div>
  </div>;
}

export default Footer;
