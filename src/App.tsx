import "./App.css";

import { Outlet, Link, ScrollRestoration } from "react-router-dom";
import { useState } from "react";

// Components
import NavBar from "./Components/NavBar/NavBar";

// Assets
import Logo from "./Assets/logo.svg"
import SocialMedia from "./Components/SocialMedia/SocialMedia";

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
      <SocialMedia />
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
