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

interface Props { }

function HomePage(props: Props) {
  const navigate = useNavigate();
  const timeToEvent = useTimeToEvent();
  const homeText = text.home;

  useEffect(() => {
    const aboutText = document.getElementById("about_text");
    const nextEventText = document.getElementById("next_event_text");

    if (aboutText) {
      aboutText.innerHTML = homeText.aboutUs.description;
    }

    if (nextEventText) {
      nextEventText.innerHTML = homeText.nextEvent.description;
    }

  }, []);

  return (
    <div className="home">
      <div id="welcome--wrapper">
        <div id="welcome" className="home--welcome pagewidth home--section">
          <h1>{homeText.welcome.title}</h1>
          <h6>{homeText.welcome.description.first}</h6>
          <div className="welcome--buttons">
            <Button onClick={() => navigate("/wydarzenia")} className="btn btn__primary-bw">{homeText.welcome.buttons.events}</Button>
            <Button onClick={() => window.location.href = "#o_nas"} className="btn btn__primary-w">{homeText.welcome.buttons.aboutUs}</Button>
          </div>
        </div>
      </div>
      {/* <div className="home--date home--section">
        {
          isEventLive() ?
            <>
              <h3>{homeText.date.textLiveEvent}</h3>
            </>
            :
            isEventDone() ?
              <>
                <h3>{homeText.date.textAfterEvent}</h3>
              </> :
              <>
                <h3>{homeText.date.text.first} {getEventDate()} {homeText.date.text.second} {getEventTime()}</h3>
                <h1>{timeToEvent}</h1>
              </>
        }
      </div> */}
      <div id="o_nas" className="home--about pagewidth home--section">
        <h2 className="header__white">{homeText.aboutUs.title}</h2>
        <p id="about_text"></p>
      </div>
      <div className="home--about__event">
        <div id="hackarena2" className="home--about pagewidth home--section">
          <h2 className="header__black">{homeText.nextEvent.title}</h2>
          <p id="next_event_text"></p>
          <Button onClick={() => navigate("/wydarzenia/hackarena2_0")} className="btn btn__primary-b btn__primary-b-border">{homeText.nextEvent.button}</Button>
        </div>
      </div>
      {/* <div id="agenda" className="home--agenda home--section pagewidth">
        <h1>{homeText.agenda.title}</h1>
        <div className="agenda--schedule">
          {
            homeText.agenda.schedule.map(({ time, event }, index) => {
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
          <h2>{homeText.dontWait.title}</h2>
          <h4>{homeText.dontWait.description}</h4>
          <p>{homeText.dontWait.dateReminder} <b>{getRegistrationEndDate()}</b></p>
          <Button onClick={() => navigate("/rejestracja")} className="btn btn__primary">{homeText.dontWait.button}</Button>
        </div>}
      <div id="faq" className="home--faq pagewidth home--section">
        <h2 className="header__white">{homeText.faq.title}</h2>
        <FAQComponent questions={homeText.faq.questions} />
      </div>
    </div>
  );
}

export default HomePage;
