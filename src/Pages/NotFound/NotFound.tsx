import React from "react";
import "./NotFound.css";
import text from "../../Assets/text.json";

interface Props { }

function NotFound(props: Props) {
  return <div className="notfound pagewidth">
    <h2>{text.notFound.title}</h2>
    <h6>{text.notFound.description}</h6>
  </div>;
}

export default NotFound;
