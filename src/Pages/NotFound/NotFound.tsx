import React from "react";
import "./NotFound.css";

interface Props { }

function NotFound(props: Props) {
  //TODO: new styling
  return <div className="notfound pagewidth">
    <h4>Błąd 404</h4>
    <h6>Strona, którą próbujesz otworzyć nie istnieje</h6>
  </div>;
}

export default NotFound;
