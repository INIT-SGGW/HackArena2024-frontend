import React from "react";
import "./HomePage.css";

interface Props {}

function HomePage(props: Props) {
  //TODO
  return (
    <div className="home pagewidth">
      <div className="home--welcome">
        <h1>HackArena</h1>
        <h3>Spróbuj swoje siły w hackatonie</h3>
        <button>Zarejestruj się</button>
      </div>
      <div id="zadanie" className="home--about">
        <h2>O co chodzi?</h2>
        <p>
          HackArena to platforma, która pozwala na organizację i udział w
          hackatonach. Wystarczy, że założysz konto, stworzysz zespół i
          przystąpisz do wybranego hackatonu. Zespół, który zdobędzie najwięcej
          punktów, wygrywa nagrodę!
        </p>
        <h2>Zadanie</h2>
        <p>
          W każdym hackatonie dostępne są zadania. Wybierz jedno, które chcesz
          wykonać i zacznij pracę. W razie problemów zawsze możesz skonsultować
          się z mentorem.
        </p>
      </div>
      <div id="agenda" className="home--agenda">
        <h2>Agenda</h2>
      </div>
      <div id="sponsorzy" className="home--sponsors">
        <h2>Sponsorzy</h2>
      </div>
      <div id="faq" className="home--faq">
        <h2>FAQ</h2>
        <p>
          <strong>Pytanie:</strong> Czy mogę wziąć udział w hackatonie sam?
        </p>
        <p>
          <strong>Odpowiedź:</strong> Tak, ale zalecamy, abyś dołączył do
          zespołu. Współpraca z innymi uczestnikami zwiększa szanse na wygraną.
        </p>
        <p>
          <strong>Pytanie:</strong> Czy mogę wziąć udział w hackatonie z
          zespołem?
        </p>
        <p>
          <strong>Odpowiedź:</strong> Tak, ale zespół nie może składać się z
          więcej niż 5 osób.
        </p>
        <p>
          <strong>Pytanie:</strong> Czy mogę wziąć udział w hackatonie z
          zespołem, który nie jest zarejestrowany na platformie?
        </p>
        <p>
          <strong>Odpowiedź:</strong> Nie, każdy zespół musi być zarejestrowany
          na platformie.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
