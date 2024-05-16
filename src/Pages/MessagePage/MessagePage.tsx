import React from "react";
import "./MessagePage.css";

interface Props {
  title: string;
  message: string;
}

function MessagePage({ title, message }: Props) {
  return <div className="message">
    <h2>{title}</h2>
    <h4>{message}</h4>
  </div>
}

export default MessagePage;
