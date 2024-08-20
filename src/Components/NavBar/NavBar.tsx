import { useState } from "react";
import "./NavBar.css";
import text from "../../Assets/text.json";
import { Link } from "react-router-dom";
import useWindowWidth from "../../Hooks/useWindowWidth";
import Menu from "../../Assets/menu.svg";
// import MenuOpen from "../../Assets/menu-open.svg";

export const NavBarButton = ({ text, link, setShowSidebar, special = false }: { text: string, link: string, setShowSidebar?: Function, special?: boolean }) => {
  return (
    <div className="navbarButton">
      <Link
        to={link}
        onClick={() => {
          if (setShowSidebar) setShowSidebar(false);
        }}
        className={`navbar__link${special === true ? " navbar__link--special" : ""}`}
      >
        {text}
      </Link>
      <div className={`navbarButton__double${special === true ? " navbarButton__double--special" : ""}`}>
        <Link
          to={link}
          className={`navbar__link${special === true ? " navbar__link--special" : ""}`}
        >
          {text}
        </Link>
      </div>
    </div>
  )
}

function NavBar({ showSideBar, setShowSidebar }: { showSideBar?: boolean, setShowSidebar?: Function }) {
  const windowWidth = useWindowWidth();
  const navItems = text.nav.navItems;

  const NavSection = () => (
    <nav className="navbar__nav">
      {navItems.map((item, index) => {
        return (
          <NavBarButton key={index} text={item.title} link={item.path} setShowSidebar={setShowSidebar} special={item.special} />
        );
      })}
    </nav>
  )

  return (
    <div className="navbar">

      {(windowWidth < 768 && setShowSidebar !== undefined && showSideBar !== undefined) ? (
        <>
          <a
            className="navbar__sidebar-icon"
            onClick={() => setShowSidebar(!showSideBar)}
          >
            <img src={Menu} alt="Menu" />
          </a>
          <div
            className={`navbar__sidebar${!showSideBar ? " navbar__sidebar--hidden" : ""
              }`}
          >
            <NavSection />
          </div>
        </>
      ) : (
        <NavSection />
      )
      }
    </div >
  );
}

export default NavBar;
