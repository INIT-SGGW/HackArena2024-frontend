import "./HomePage.css";
import { useNavigate } from "react-router";
import useTimeToEvent from "../../Hooks/useTimeToEvent";
import { getEventDate, getEventTime, getRegistrationEndDate } from "../../Constants/Constants";
import text from "../../Assets/text.json";
import ChevronIcon from "../../Assets/chevron-down.svg";
import { useState } from "react";

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
  return (
    <div className="home">
      <div id="welcome" className="home--welcome pagewidth home--section">
        <h1><span>Hack</span>Arena 2024</h1>
        <div className="welcome--text">
          <h6>Bezpłatny, 8 godzinny hackathon odbywający się na terenie <span>SGGW w Warszawie</span></h6>
          <p>Zbierz drużynę, stwórz bota, zwycięż w turnieju</p>
        </div>
        <div className="welcome--buttons">
          <button onClick={() => navigate("/rejestracja")} className="account--button account--button__primary">Zapisz się</button>
          <button onClick={() => window.location.href = "#zadanie"} className="account--button account--button__secondary">Zobacz więcej</button>
        </div>
      </div>
      <div className="home--date home--section">
        <h3>Start {getEventDate()} o {getEventTime()}</h3>
        <h1>{timeToEvent}</h1>
      </div>
      <div id="zadanie" className="home--about pagewidth home--section">
        <h1>Zadanie</h1>
        <p>Waszym zadaniem będzie <span>stworzenie bota w języku python</span>, do gry która zostanie
          ujawniona w dniu rozpoczęcia HackAreny. W maksymalnie <span>3 osobowych
            grupach</span> będziecie mieli <span>8 godzin</span> na implementację algorytmu zdolnego
          do samodzielnego przeprowadzenia rozgrywki. Komunikację z grą
          zapewni dostarczone przez nas API. Na koniec wydarzenia zostanie
          przeprowadzony <span>turniej, który wyłoni zwycięską drużynę.</span></p>
      </div>
      <div id="agenda" className="home--agenda home--section pagewidth">
        <h1>Agenda</h1>
        <div className="agenda--schedule">
          {
            homeText.agenda.schedule.map(({ time, event }, index) => {
              return <div className="agenda--component">
                <p>{time}</p>
                <p>{event}</p>
              </div>
            })
          }
        </div>
      </div>
      <div id='nieczekaj' className="home--dwait pagewidth home--section">
        <h1>Nie czekaj!</h1>
        <h4>Zbierz swój zespół i dołącz już teraz</h4>
        <p>Zapisy trwają do <b>{getRegistrationEndDate()}</b></p>
        <button onClick={() => navigate("/rejestracja")} className="account--button account--button__primary">Zarejestruj się</button>
      </div>
      <div id="faq" className="home--faq pagewidth home--section">
        <h1>FAQ</h1>
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
