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
import { LoginRequestBody } from "../../Types/requests";
import { ErrorBodyResponse, LoginBodyResponse } from "../../Types/responses";
import { EmailRegex, PasswordRegex } from "../../Constants/Regex";

function LoginPage() {
  const pageText: PageText = text.login;
  const [error, setError] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/konto");
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const dataObject = Object.fromEntries(data);

    const body: LoginRequestBody = {
      email: dataObject.email as string,
      password: dataObject.password as string
    };

    setInputsDisabled(true);

    AuthenticationService.login(body)
      .then((response) => {
        if (response.status === 202) {
          response.json().then((data: LoginBodyResponse) => {
            try {
              localStorage.setItem("email", JSON.stringify(data.email));
              localStorage.setItem("teamName", JSON.stringify(data.teamName));
            } catch (error) {
              setError("Wystąpił błąd podczas logowania");
              localStorage.removeItem("email");
              localStorage.removeItem("teamName");
              setInputsDisabled(false);
            }
            navigate("/konto");
          });
        } else {
          response.json().then((data: ErrorBodyResponse) => {
            setError(data.error);
            setInputsDisabled(false);
          }).catch(() => {
            setError("Błąd serwera");
            setInputsDisabled(false);
          });
        }
      })
      .catch((error) => {
        setError("Błąd połączenia z serwerem");
        setInputsDisabled(false);
      });
  };

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
      {error &&
        <Alert
          title="Błąd"
          description="Wystąpił błąd podczas logowania:"
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
            pattern={EmailRegex}
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
            pattern={PasswordRegex}
          />
          <input
            type="submit"
            className="input__element input__button"
            onClick={() => setShowErrors(true)}
            disabled={inputsDisabled}
            value={inputsDisabled ? pageText.button.disabled : pageText.button.active}
          />
          <Link className="login__forgot" to="/password/forgot">Zapomniałeś hasła?</Link>
        </form>
      </div>
    </Page>
  )
}


export default LoginPage;
