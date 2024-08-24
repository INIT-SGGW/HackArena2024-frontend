import React from "react";
import "./MessagePage.css";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";

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
    {buttonOneLink && <Button className="btn btn__primary" onClick={() => navigator(buttonOneLink)}>{buttonOneText || ""}</Button>}
    {buttonTwoLink && <Button className="btn btn__secondary" onClick={() => navigator(buttonTwoLink)}>{buttonTwoText || ""}</Button>}
  </div>
}

export default MessagePage;
