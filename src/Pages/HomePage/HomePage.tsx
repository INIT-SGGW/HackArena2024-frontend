import "./HomePage.css";
import { useNavigate } from "react-router";
import useTimeToEvent from "../../Hooks/useTimeToEvent";
import text from "../../Assets/text.json";
import { eventStartDate, registrationEndDate, registrationStartDate } from "../../Constants/Dates";
import dateFormat, { DateFormat } from "../../Utils/dateFormat"
import { useEffect } from "react";
import FAQComponent from "../../Components/FAQ/FAQ";
import Button from "../../Components/Button/Button";
import Page from "../../Components/Page/Page";
import { PageText } from "./types";
import getEventStatus, { EventStatus } from "../../Utils/getEventStatus";
import replacePlaceholders from "../../Utils/replacePlaceholders";
import Sponsors from "../../Components/Sponsors/Sponsors";
import HexagonGrid from "../../Components/HoneyComb/HoneyComb";
import WelcomImage from "../../Assets/hackarena_1_0_yellow_4.jpg"
import LiveEventHighlight from "../../Components/LiveEventHighlight/LiveEventHighlight";

interface Props { }

function HomePage(props: Props) {
  const navigate = useNavigate();
  const timeToEvent = useTimeToEvent();
  const pageText: PageText = text.home;

  useEffect(() => {
    const aboutText = document.getElementById("about_text");
    const nextEventText = document.getElementById("next_event_text");

    if (aboutText) {
      aboutText.innerHTML = pageText.aboutUs.description;
    }

    if (nextEventText) {
      nextEventText.innerHTML = pageText.nextEvent.description;
    }
  }, []);

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} paddingTop={false} paddingBottom={false}>
      <div className="home">
        <div className="home--welcome">
          <HexagonGrid image={WelcomImage} defaultHexagonSize={85} gap={2} componentText={pageText.welcome} />
        </div>
        <div className="test">

        </div>

        {/* <div id="welcome--wrapper">
          <div id="welcome" className="home--welcome pagewidth home--section">
            <h1>{pageText.welcome.title}</h1>
            <h6>{pageText.welcome.description.first}</h6>
            <div className="welcome--buttons">
              <Button onClick={() => navigate("/wydarzenia")} className="btn btn__primary-bw">{pageText.welcome.buttons.events}</Button>
              <Button onClick={() => window.location.href = "#o_nas"} className="btn btn__primary-w">{pageText.welcome.buttons.aboutUs}</Button>
            </div>
          </div>
        </div> */}
        <LiveEventHighlight />

        <div style={{
          display: "flex",
          flexDirection: getEventStatus() === EventStatus.Default ? "column-reverse" : "column",
        }}>

          <div className="home--about__event">
            <div id="hackarena2" className="home--about pagewidth home--section">
              <h2 className="header__black">{pageText.nextEvent.title}</h2>
              <p id="next_event_text"></p>
              <Button onClick={() => navigate("/wydarzenia/hackarena2_0")} className="btn btn__primary-b btn__primary-b-border">{pageText.nextEvent.button}</Button>
            </div>
          </div>
          <div id="o_nas" className="home--about pagewidth home--section">
            <h2 className="header__white">{pageText.aboutUs.title}</h2>
            <p id="about_text"></p>
          </div>
        </div>
        {/* <div id="agenda" className="home--agenda home--section pagewidth">
        <h1>{pageText.agenda.title}</h1>
        <div className="agenda--schedule">
          {
            pageText.agenda.schedule.map(({ time, event }, index) => {
              return <div key={index} className="agenda--component">
                <p>{time}</p>
                <p>{event}</p>
              </div>
            })
          }
        </div>
      </div> */}
        <div className="pagewidth home--section">
          <Sponsors />

        </div>

        {/* <div id="faq" className="home--faq pagewidth home--section">
          <h2 className="header__white">{pageText.faq.title}</h2>
          <FAQComponent questions={pageText.faq.questions} />
        </div> */}
      </div>
    </Page >
  );
}

export default HomePage;
