import "./HomePage.css";
import { useNavigate } from "react-router";
import useTimeToEvent from "../../Hooks/useTimeToEvent";
import { getEventDate, getEventTime, getRegistrationEndDate } from "../../Constants/Constants";
import text from "../../Assets/text.json";
import { useEffect, useState } from "react";
import isRegistrationOpen from "../../Utils/isRegistrationOpen";
import isEventLive from "../../Utils/isEventLive";
import isEventDone from "../../Utils/isEventDone";
import FAQ from "../../Components/FAQ/FAQ";
import FAQComponent from "../../Components/FAQ/FAQ";
import Button from "../../Components/Button/Button";
import Page from "../../Components/Page/Page";
import { PageText } from "./types";

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
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description}>
      <div className="home">
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
        {/* <div className="home--date home--section">
        {
          isEventLive() ?
            <>
              <h3>{pageText.date.textLiveEvent}</h3>
            </>
            :
            isEventDone() ?
              <>
                <h3>{pageText.date.textAfterEvent}</h3>
              </> :
              <>
                <h3>{pageText.date.text.first} {getEventDate()} {pageText.date.text.second} {getEventTime()}</h3>
                <h1>{timeToEvent}</h1>
              </>
        }
      </div> */}
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
        {
          isRegistrationOpen() &&
          <div id='nieczekaj' className="home--dwait pagewidth home--section">
            <h2>{pageText.dontWait.title}</h2>
            <h4>{pageText.dontWait.description}</h4>
            <p>{pageText.dontWait.dateReminder} <b>{getRegistrationEndDate()}</b></p>
            <Button onClick={() => navigate("/rejestracja")} className="btn btn__primary">{pageText.dontWait.button}</Button>
          </div>}
        <div id="faq" className="home--faq pagewidth home--section">
          <h2 className="header__white">{pageText.faq.title}</h2>
          <FAQComponent questions={pageText.faq.questions} />
        </div>
      </div>
    </Page>
  );
}

export default HomePage;
