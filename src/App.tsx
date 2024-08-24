import "./App.css";

import { Outlet, Link, ScrollRestoration } from "react-router-dom";
import { useState } from "react";

// Components
import NavBar from "./Components/NavBar/NavBar";

// Assets
import Logo from "./Assets/logo.svg"
import FacebookIcon from "./Assets/facebook.svg";
import InstagramIcon from "./Assets/instagram.svg";
import DiscordIcon from "./Assets/discord.svg";
import LinkedInIcon from "./Assets/linkedin.svg";

const TopBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="topbar__wrapper">
      <div className="topbar pagewidth">
        <Link to="/">
          <img src={Logo} alt="HackArena" />
        </Link>
        <NavBar showSideBar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="footer">
      <NavBar />
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
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <ScrollRestoration />
      <TopBar />
      <div className="app--content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
