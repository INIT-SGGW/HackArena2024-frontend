import { Outlet } from "react-router";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <NavBar />
      <div className="app--content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
