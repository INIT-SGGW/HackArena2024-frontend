import React from "react";
import "./MessagePage.css";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  message: string;
  buttonOneText?: string;
  buttonOneLink?: string;
  buttonTwoText?: string;
  buttonTwoLink?: string;
}

function MessagePage({ title, message, buttonOneText, buttonOneLink, buttonTwoText, buttonTwoLink }: Props) {
  const navigator = useNavigate();

  return <div className="message">
    <h2>{title}</h2>
    <h4>{message}</h4>
    {buttonOneLink && <button className="account--button account--button__primary" onClick={() => navigator(buttonOneLink)}>{buttonOneText}</button>}
    {buttonTwoLink && <button className="account--button account--button__secondary" onClick={() => navigator(buttonTwoLink)}>{buttonTwoText}</button>}
  </div>
}

export default MessagePage;
