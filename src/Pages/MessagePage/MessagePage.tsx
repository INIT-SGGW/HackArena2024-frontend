import React from "react";
import "./MessagePage.css";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Page from "../../Components/Page/Page";

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

  return (
    <Page pageTitle={title} description={message} noIndex>
      <div className="message">
        <h2>{title}</h2>
        <h4>{message}</h4>
        {buttonOneLink && <Button className="btn btn__primary" onClick={() => navigator(buttonOneLink)}>{buttonOneText || ""}</Button>}
        {buttonTwoLink && <Button className="btn btn__secondary" onClick={() => navigator(buttonTwoLink)}>{buttonTwoText || ""}</Button>}
      </div>
    </Page>
  );
}

export default MessagePage;
