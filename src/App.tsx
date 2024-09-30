import "./App.css";

import { Outlet, Link, ScrollRestoration } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

// Components
import NavBar from "./Components/NavBar/NavBar";

// Assets
import Logo from "./Assets/logo.svg"
import SocialMedia from "./Components/SocialMedia/SocialMedia";
import useWindowWidth from "./Hooks/useWindowWidth";
import SGGW from "./Assets/sggw_logo_white.png";

const TopBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="topbar__wrapper">
      <div className="topbar pagewidth">
        <div style={{ height: '100%' }} className="section--row-1" >
          <Link to="/">
            <img src={Logo} alt="HackArena" />
          </Link>
          <a href="https://www.sggw.edu.pl">
            <img src={SGGW} alt="SGGW" />
          </a>

        </div>
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
      <SocialMedia mobileHeight />
    </div>
  )
}

function App() {
  const appContentRef = useRef<HTMLDivElement | null>(null);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const topBarHeight = document.querySelector('.topbar__wrapper')?.clientHeight || 0;
    if (windowWidth <= 768 && appContentRef.current) {
      appContentRef.current.style.marginTop = `${topBarHeight}px`;
    } else {
      appContentRef.current?.style.removeProperty('margin-top');
    }
  }, [windowWidth])

  return (
    <div className="app">
      <ScrollRestoration />
      <TopBar />
      <div ref={appContentRef} className="app--content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
