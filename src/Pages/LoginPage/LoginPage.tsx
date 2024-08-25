import "./LoginPage.css";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { handleErrorMessages } from "../../Utils/handleErrorMessages";
import text from "../../Assets/text.json";
import { LoginBody } from "../../Types/types";
import AuthenticationService from "../../Services/AuthenticationService";
import Alert from "../../Components/Alert/Alert";
import Page from "../../Components/Page/Page";
import { PageText } from "./types";

interface Props { }

type LoginValues = {
  email: string;
  password: string;
};

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

function LoginPage(props: Props) {
  const pageText: PageText = text.login;
  const [teamID, setTeamID] = useState<string | null>(
    localStorage.getItem("teamID") || null
  );
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginValues>({
    email: "",
    password: "",
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (teamID) {
      navigate("/konto/" + teamID);
    }
  }, [teamID, navigate]);

  const handleTrySubmit = () => {
    setShowErrors(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputsDisabled(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: FormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rememberMe: formData.get("remember") === "on",
    };

    const loginBody: LoginBody = {
      email: data.email,
      password: data.password,
    };
    AuthenticationService.login(loginBody).then((response) => {
      setInputsDisabled(false);
      response.json().then((data) => {
        if (response.status === 202) {
          localStorage.setItem("teamID", data.teamName);
          navigate("/konto/" + data.teamName);
        }
        else if (response.status === 403 && data.error === "Invalid password or Team Name") {
          setSubmitError("Podane dane są nieprawidłowe.");
        }
        else {
          setSubmitError("Wystąpił błąd podczas logowania.");
        }
      });
    }).catch((e) => {
      setSubmitError("Wystąpił błąd podczas logowania.");
    });
  };

  if (teamID) return null;

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
      <div className="login pagewidth">
        {
          submitError &&
          <Alert
            title="Błąd"
            message={submitError}
            buttonOneText="Zamknij"
            buttonOneAction={() => setSubmitError(null)}
          />
        }
        <h2>{pageText.title}</h2>
        <form onSubmit={handleSubmit} className="login--form">
          <div className="login--input">
            <label
              className="input--label"
              htmlFor={pageText.loginFields.email.id}
            >
              {pageText.loginFields.email.label}
            </label>
            <input
              onInvalid={(e) => {
                e.preventDefault();

                handleErrorMessages<LoginValues>(
                  e.currentTarget,
                  pageText.loginFields.email.errorMessage,
                  setErrors
                );
              }}
              onChange={(e) => {
                handleErrorMessages<LoginValues>(
                  e.currentTarget,
                  pageText.loginFields.email.errorMessage,
                  setErrors
                );
              }}
              spellCheck={false}
              disabled={inputsDisabled}
              type="email"
              id={pageText.loginFields.email.id}
              name={pageText.loginFields.email.name}
              placeholder={pageText.loginFields.email.label}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              className={`input--input${showErrors && errors.email ? " input--input__error" : ""
                }`}
              required
              maxLength={60}
            />
            <span
              className={`input--span${showErrors ? " input--span__visible" : ""
                }`}
            >
              {errors.email}
            </span>
          </div>
          <div className="login--input">
            <label
              className="input--label"
              htmlFor={pageText.loginFields.password.id}
            >
              {pageText.loginFields.password.label}
            </label>
            <input
              onInvalid={(e) => {
                e.preventDefault();

                handleErrorMessages<LoginValues>(
                  e.currentTarget,
                  pageText.loginFields.password.errorMessage,
                  setErrors
                );
              }}
              onChange={(e) => {
                handleErrorMessages<LoginValues>(
                  e.currentTarget,
                  pageText.loginFields.password.errorMessage,
                  setErrors
                );
              }}
              type="password"
              disabled={inputsDisabled}
              id={pageText.loginFields.password.id}
              placeholder={pageText.loginFields.password.label}
              name={pageText.loginFields.password.name}
              className={`input--input${errors.password && showErrors ? " input--input__error" : ""
                }`}
              pattern=".*"
              required
              maxLength={80}
            />
            <span
              className={`input--span${showErrors ? " input--span__visible" : ""
                }`}
            >
              {errors.password}
            </span>
          </div>
          <div className="login--options">
            {/* <Link to="/reset">{pageText.loginFields.forgotPassword.label}</Link> */}
            <Link to="/rejestracja">{pageText.loginFields.noAccount.label}</Link>
          </div>
          <div className="register--checkbox login--checkbox">
            <label
              className="input--label"
              htmlFor={pageText.loginFields.rememberMe.id}
            >
              {pageText.loginFields.rememberMe.label}
            </label>
            <input
              className="input--checkbox"
              type="checkbox"
              disabled={inputsDisabled}
              id={pageText.loginFields.rememberMe.id}
              name={pageText.loginFields.rememberMe.name}
            />
          </div>
          <input
            className="input--input login--submit input--submit__primary"
            type="submit"
            disabled={inputsDisabled}
            value={
              inputsDisabled ? pageText.button.disabled : pageText.button.acitve
            }
            onClick={handleTrySubmit}
          />
        </form>
      </div>
    </Page>
  );
}

export default LoginPage;
