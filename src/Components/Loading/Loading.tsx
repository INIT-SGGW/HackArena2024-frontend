import React from "react";
import "./Loading.css";

export enum Status {
  Waiting,
  Loading,
  Error,
  Success,
}

interface Props {
  setRenderVariable(value: Status): void;
  successRedirect: string;
  status: Status;
  messageSucces: string;
  messageError: string;
  titleSuccess: string;
}

function Loading(props: Props) {
  const {
    setRenderVariable,
    successRedirect,
    status,
    titleSuccess,
    messageError,
    messageSucces,
  } = props;

  return (
    <div className="loading">
      {status === Status.Loading && (
        <div className="loading--loading">
          <h1>.</h1>
          <h1>.</h1>
          <h1>.</h1>
        </div>
      )}
      {status === Status.Error && (
        <div className="loading--message">
          <h5>{messageError}</h5>
          <button
            className="input--input loading--button"
            onClick={() => setRenderVariable(Status.Waiting)}
          >
            WRÓĆ
          </button>
        </div>
      )}
      {status === Status.Success && (
        <div className="loading--message">
          <h3>{titleSuccess}</h3>
          <h5>{messageSucces}</h5>
          <button
            className="input--input loading--button"
            onClick={() => (window.location.href = successRedirect)}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default Loading;
