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
        <div className="section--column-05">
          <h2 className="header header__yellow">{title}</h2>
          <h6>{message}</h6>
        </div>
        <div className="section--row-1">
          {buttonOneLink && <Button className="btn btn__primary btn__primary-border" onClick={() => navigator(buttonOneLink)}>{buttonOneText || ""}</Button>}
          {buttonTwoLink && <Button className="btn btn__secondary" onClick={() => navigator(buttonTwoLink)}>{buttonTwoText || ""}</Button>}
        </div>
      </div>
    </Page>
  );
}

export default MessagePage;
