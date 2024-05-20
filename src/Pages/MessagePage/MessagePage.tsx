import React from "react";
import "./MessagePage.css";
import { useNavigate } from "react-router";

interface Props {
  title: string;
  message: string;
  buttonOneText?: string;
  buttonOneLink?: string;
  buttonTwoText?: string;
  buttonTwoLink?: string;
}

function MessagePage({ title, message, buttonOneText, buttonOneLink, buttonTwoText, buttonTwoLink }: Props) {
  const navigate = useNavigate();

  return <div className="message">
    <h2>{title}</h2>
    <h4>{message}</h4>
    <div>
      {
        buttonOneText &&
        <button className="account--button account--button__primary" onClick={() => navigate(buttonOneLink || "/")}>
          {buttonOneText}
        </button>
      }
      {
        buttonTwoText &&
        <button className="account--button account--button__secondary" onClick={() => navigate(buttonTwoLink || "/")}>
          {buttonTwoText}
        </button>
      }

    </div>
  </div>
}

export default MessagePage;
