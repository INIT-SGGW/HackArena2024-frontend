import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router";
import text from "../../Assets/text.json";
import Button from "../../Components/Button/Button";

interface Props { }

function NotFound(props: Props) {
  const pageText = text.notFound;
  const navigation = useNavigate();

  return (
    <div className="notfound pagewidth">
      <h2 className="header__white">{pageText.title}</h2>
      <h6>{pageText.description}</h6>
      <div>
        <Button className="btn btn__primary-w" onClick={() => navigation("/")}>{pageText.buttons.home}</Button>
        <Button className="btn btn__secondary-w" onClick={() => navigation(-1)}>{pageText.buttons.goBack}</Button>
      </div>
    </div>
  )
}

export default NotFound;
