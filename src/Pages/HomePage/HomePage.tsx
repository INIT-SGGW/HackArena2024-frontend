import "./HomePage.css";
import { useNavigate } from "react-router";
import useTimeToEvent from "../../Hooks/useTimeToEvent";
import { getEventDate, getEventTime, getRegistrationEndDate } from "../../Constants/Constants";
import text from "../../Assets/text.json";
import ChevronIcon from "../../Assets/chevron-down.svg";
import { useEffect, useState } from "react";
import isRegistrationOpen from "../../Utils/isRegistrationOpen";
import isEventLive from "../../Utils/isEventLive";
import isEventDone from "../../Utils/isEventDone";

interface Props { }

interface AgendaItemProps {
  question: string;
  answer: string;
}

export const FAQComponent = ({ question, answer }: AgendaItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="faq--component">
      <div className={`faq--box faq--question`} onClick={() => setIsOpen(!isOpen)}>
        <h6>{question}</h6>
        <img src={ChevronIcon} alt=">" className={`${isOpen ? "faq--icon__open" : ""}`} />
      </div>
      <div className={`faq--answer__wrapper${isOpen ? " faq--answer__open" : ""}`}>
        <div className={`faq--box faq--answer`}>
          <p>{answer}</p>
        </div>
      </div>

    </div>
  );
}

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
            <button onClick={() => navigate("/wydarzenia")} className="account--button account--button__primary-black-2">{homeText.welcome.buttons.events}</button>
            <button onClick={() => window.location.href = "#o nas"} className="account--button account--button__secondary-white">{homeText.welcome.buttons.aboutUs}</button>
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
      <div id="o nas" className="home--about pagewidth home--section">
        <h2>{homeText.aboutUs.title}</h2>
        <p id="about_text"></p>
      </div>
      <div className="home--about__event">
        <div id="hackarena2" className="home--about pagewidth home--section">
          <h2>{homeText.nextEvent.title}</h2>
          <p id="next_event_text"></p>
          <button onClick={() => navigate("/wydarzenia/hackarena2_0")} className="account--button account--button__primary-black">{homeText.nextEvent.button}</button>
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
                <p />
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
          <button onClick={() => navigate("/rejestracja")} className="account--button account--button__primary">{homeText.dontWait.button}</button>
        </div>}
      <div id="faq" className="home--faq pagewidth home--section">
        <h2>{homeText.faq.title}</h2>
        <div className="faq--content">
          {
            homeText.faq.questions.map(({ question, answer }, index) => {
              return <FAQComponent key={index} question={question} answer={answer} />
            })
          }
        </div>
      </div>
    </div>
  );
}

export default HomePage;
