import "./LoginPage.css";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import text from "../../Assets/text.json";
import AuthenticationService from "../../Services/AuthenticationService";
import Alert from "../../Components/Alert/Alert";
import Page from "../../Components/Page/Page";
import { PageText } from "./types";
import Input from "../../Components/Input/Input";
import { LoginRequest } from "../../Types/requests";

function LoginPage() {
  const pageText: PageText = text.login;
  const [error, setError] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const dataObject = Object.fromEntries(data);

    setInputsDisabled(true);

    AuthenticationService.login(dataObject as LoginRequest)
      .then((response) => {
        if (response.status === 200) {
          navigate("/konto");
        } else {
          setError("Błędny email lub hasło");
          setInputsDisabled(false);
        }
      })
      .catch((error) => {
        setError("Wystąpił błąd podczas logowania");
        setInputsDisabled(false);
      });
  };

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
      {error &&
        <Alert
          title="Błąd"
          message={error}
          buttonOneText="Spróbuj ponownie"
          buttonOneAction={() => { setError(""); }}
        />
      }
      <div className="login pagewidth">
        <h2 className="header header__yellow">{pageText.title}</h2>
        <form className="section--column-0" onSubmit={handleSubmit}>
          <Input
            pageText={pageText.form.email}
            id="email"
            name="email"
            type="email"
            showError={showErrors}
            maxLength={70}
            inputDisabled={inputsDisabled}
            pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$"
          />
          <Input
            pageText={pageText.form.password}
            id="password"
            name="password"
            type="password"
            showError={showErrors}
            inputDisabled={inputsDisabled}
            minLength={8}
            maxLength={70}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
          />
          <Link to="/reset-password">Zapomniałeś hasła?</Link>
          <input
            type="submit"
            className="input__element input__button"
            onClick={() => setShowErrors(true)}
            disabled={inputsDisabled}
            value={inputsDisabled ? pageText.button.disabled : pageText.button.active}
          />
        </form>
      </div>
    </Page>
  )
}


export default LoginPage;
