import { Outlet } from "react-router";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import "./App.css";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import text from "./Assets/text.json";

function App() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <ScrollRestoration />
      {/* <div className="topbar" onClick={() => navigate("/wydarzenia/hackarena2_0")}>
        <p>{text.topBar.text}</p>
      </div> */}
      <NavBar />
      <div className="app--content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
