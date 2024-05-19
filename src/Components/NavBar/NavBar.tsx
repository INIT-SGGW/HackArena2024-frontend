import { useState } from "react";
import "./NavBar.css";
import text from "../../Assets/text.json";
import { Link } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import useWindowWidth from "../../Hooks/useWindowWidth";
import Menu from "../../Assets/menu.svg";
// import MenuOpen from "../../Assets/menu-open.svg";

function NavBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const windowWidth = useWindowWidth();
  const navItems = text.nav.navItems;
  return (
    <div className="navbar">
      <div className="navbar--content pagewidth">
        <Link to="/" onClick={() => setShowSidebar(false)}>
          <img src={Logo} alt="HackArena" />
        </Link>
        {windowWidth < 768 ? (
          <>
            <a
              className={`navbar--icon${!showSidebar ? " navbar--icon__closed" : ""
                }`}
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <img src={Menu} alt="-" />
              {/* <img src={MenuOpen} alt="-" /> */}
            </a>
            <div
              className={`navbar--sidebar${!showSidebar ? " navbar--sidebar__hidden" : ""
                }`}
            >
              <nav className="navbar__nav">
                <Link
                  to="/rejestracja"
                  onClick={() => setShowSidebar(false)}
                  className="navbar__link navbar__link--special"
                >
                  {navItems[0]}
                </Link>
                {navItems.slice(1, navItems.length - 1).map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={`/#${item.toLowerCase()}`}
                      className="navbar__link"
                      onClick={() => setShowSidebar(false)}
                    >
                      {item}
                    </a>
                  );
                })}
                <Link
                  to="/login"
                  onClick={() => setShowSidebar(false)}
                  className="navbar__link"
                >
                  {navItems[navItems.length - 1]}
                </Link>
              </nav>
            </div>
          </>
        ) : (
          <>
            <nav className="navbar__nav">
              <Link
                to="/rejestracja"
                className="navbar__link navbar__link--special"
              >
                {navItems[0]}
              </Link>
              {navItems.slice(1, navItems.length - 1).map((item, index) => {
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
              <Link to="/login" className="navbar__link">
                {navItems[navItems.length - 1]}
              </Link>
            </nav>
          </>
        )}
      </div>
    </div >
  );
}

export default NavBar;
