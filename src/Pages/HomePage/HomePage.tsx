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
        <HexagonGrid />

        <div id="welcome--wrapper">
          <div id="welcome" className="home--welcome pagewidth home--section">
            <h1>{pageText.welcome.title}</h1>
            <h6>{pageText.welcome.description.first}</h6>
            <div className="welcome--buttons">
              <Button onClick={() => navigate("/wydarzenia")} className="btn btn__primary-bw">{pageText.welcome.buttons.events}</Button>
              <Button onClick={() => window.location.href = "#o_nas"} className="btn btn__primary-w">{pageText.welcome.buttons.aboutUs}</Button>
            </div>
          </div>
        </div>
        {
          getEventStatus() === EventStatus.EventLive &&
          <div className="home--date home--section">

            <h3>{pageText.date.eventLive}</h3>
          </div>
        }
        {
          getEventStatus() === EventStatus.EventDone &&
          <div className="home--date home--section">
            <h3>{pageText.date.eventDone}</h3>
          </div>
        }
        {
          (getEventStatus() === EventStatus.CloseToRegistration ||
            getEventStatus() === EventStatus.RegistrationOpen ||
            getEventStatus() === EventStatus.RegistrationClosed) &&
          <div className="home--date home--section">
            {/* TODO: style home date */}
            <h3>{replacePlaceholders(
              pageText.date.closeToRegistration,
              [dateFormat(eventStartDate, DateFormat.DATE), dateFormat(eventStartDate, DateFormat.TIME)])}
            </h3>
            <h2 className="header__yellow">{timeToEvent}</h2>
          </div>
        }

        {
          getEventStatus() === EventStatus.RegistrationOpen &&
          <div id='nieczekaj' className="home--dontwait pagewidth home--section">
            {/* TODO: style dont wait change id? */}
            <h2 className="header__white">{pageText.dontWait.title}</h2>
            <h4>{pageText.dontWait.description}</h4>
            <p>{replacePlaceholders(pageText.dontWait.dateReminder, dateFormat(registrationEndDate, DateFormat.DATE))}</p>
            <Button onClick={() => navigate("/rejestracja")} className="btn btn__primary-w btn__primary-w-border">{pageText.dontWait.button}</Button>
          </div>
        }
        <div id="o_nas" className="home--about pagewidth home--section">
          <h2 className="header__white">{pageText.aboutUs.title}</h2>
          <p id="about_text"></p>
        </div>
        <div className="home--about__event">
          <div id="hackarena2" className="home--about pagewidth home--section">
            <h2 className="header__black">{pageText.nextEvent.title}</h2>
            <p id="next_event_text"></p>
            <Button onClick={() => navigate("/wydarzenia/hackarena2_0")} className="btn btn__primary-b btn__primary-b-border">{pageText.nextEvent.button}</Button>
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

        <div id="faq" className="home--faq pagewidth home--section">
          <h2 className="header__white">{pageText.faq.title}</h2>
          <FAQComponent questions={pageText.faq.questions} />
        </div>
      </div>
    </Page>
  );
}

export default HomePage;
