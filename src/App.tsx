import { Outlet } from "react-router";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import "./App.css";
import { ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <ScrollRestoration />
      <NavBar />
      <div className="app--content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
