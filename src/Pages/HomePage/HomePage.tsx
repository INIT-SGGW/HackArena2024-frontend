import "./HomePage.css";
import { useNavigate } from "react-router";
import useTimeToEvent from "../../Hooks/useTimeToEvent";
import { getEventDate, getEventTime, getRegistrationEndDate } from "../../Constants/Constants";
import text from "../../Assets/text.json";
import ChevronIcon from "../../Assets/chevron-down.svg";
import { useState } from "react";
import $ from 'jquery';

interface Props { }

interface AgendaItemProps {
  question: string;
  answer: string;
}

const FAQComponent = ({ question, answer }: AgendaItemProps) => {
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
  const span: string = "<span>asdf</span>"
  return (
    <div className="home">
      <div id="welcome" className="home--welcome pagewidth home--section">
        <h1>{homeText.welcome.title}</h1>
        <div className="welcome--text">
          <h6>{homeText.welcome.description.first} <span>{homeText.welcome.description.second}</span></h6>
          <p>{homeText.welcome.slogan}</p>
        </div>
        <div className="welcome--buttons">
          <button onClick={() => navigate("/rejestracja")} className="account--button account--button__primary">{homeText.welcome.buttons.register}</button>
          <button onClick={() => window.location.href = "#zadanie"} className="account--button account--button__secondary">{homeText.welcome.buttons.seeMore}</button>
        </div>
      </div>
      <div className="home--date home--section">
        <h3>{homeText.date.text.first} {getEventDate()} {homeText.date.text.second} {getEventTime()}</h3>
        <h1>{timeToEvent}</h1>
      </div>
      <div id="zadanie" className="home--about pagewidth home--section">
        <h1>{homeText.zadanie.title}</h1>
        <p>{homeText.zadanie.description.first} <span>{homeText.zadanie.description.second}</span> {homeText.zadanie.description.third} <span>{homeText.zadanie.description.fourth}</span> {homeText.zadanie.description.fifth} <span>{homeText.zadanie.description.sixth}</span> {homeText.zadanie.description.seventh} <span>{homeText.zadanie.description.eighth}</span></p>
      </div>
      <div id="agenda" className="home--agenda home--section pagewidth">
        <h1>{homeText.agenda.title}</h1>
        <div className="agenda--schedule">
          {
            homeText.agenda.schedule.map(({ time, event }, index) => {
              return <div className="agenda--component">
                <p>{time}</p>
                <p>{event}</p>
                <p />
              </div>
            })
          }
        </div>
      </div>
      <div id='nieczekaj' className="home--dwait pagewidth home--section">
        <h1>{homeText.dontWait.title}</h1>
        <h4>{homeText.dontWait.description}</h4>
        <p>{homeText.dontWait.dateReminder} <b>{getRegistrationEndDate()}</b></p>
        <button onClick={() => navigate("/rejestracja")} className="account--button account--button__primary">{homeText.dontWait.button}</button>
      </div>
      <div id="faq" className="home--faq pagewidth home--section">
        <h1>{homeText.faq.title}</h1>
        <div className="faq--content">
          {
            homeText.faq.questions.map(({ question, answer }, index) => {
              return <FAQComponent question={question} answer={answer} />
            })
          }
        </div>
      </div>
    </div>
  );
}

export default HomePage;
