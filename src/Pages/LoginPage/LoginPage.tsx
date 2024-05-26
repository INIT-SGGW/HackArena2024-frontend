import "./LoginPage.css";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { handleErrorMessages } from "../../Utils/handleErrorMessages";
import text from "../../Assets/text.json";
import { LoginBody } from "../../Types/types";
import AuthenticationService from "../../Services/AuthenticationService";
import Alert from "../../Components/Alert/Alert";

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
  const loginText = text.login;
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
      alert("Wystąpił błąd podczas logowania.");
    });
  };

  if (teamID) return null;

  return (
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
      <h2>{loginText.title}</h2>
      <form onSubmit={handleSubmit} className="login--form">
        <div className="login--input">
          <label
            className="input--label"
            htmlFor={loginText.loginFields.email.id}
          >
            {loginText.loginFields.email.label}
          </label>
          <input
            onInvalid={(e) => {
              e.preventDefault();

              handleErrorMessages<LoginValues>(
                e.currentTarget,
                loginText.loginFields.email.errorMessage,
                setErrors
              );
            }}
            onChange={(e) => {
              handleErrorMessages<LoginValues>(
                e.currentTarget,
                loginText.loginFields.email.errorMessage,
                setErrors
              );
            }}
            spellCheck={false}
            disabled={inputsDisabled}
            type="email"
            id={loginText.loginFields.email.id}
            name={loginText.loginFields.email.name}
            placeholder={loginText.loginFields.email.label}
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
            htmlFor={loginText.loginFields.password.id}
          >
            {loginText.loginFields.password.label}
          </label>
          <input
            onInvalid={(e) => {
              e.preventDefault();

              handleErrorMessages<LoginValues>(
                e.currentTarget,
                loginText.loginFields.password.errorMessage,
                setErrors
              );
            }}
            onChange={(e) => {
              handleErrorMessages<LoginValues>(
                e.currentTarget,
                loginText.loginFields.password.errorMessage,
                setErrors
              );
            }}
            type="password"
            disabled={inputsDisabled}
            id={loginText.loginFields.password.id}
            placeholder={loginText.loginFields.password.label}
            name={loginText.loginFields.password.name}
            className={`input--input${errors.password && showErrors ? " input--input__error" : ""
              }`}
            pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
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
          {/* <Link to="/reset">{loginText.loginFields.forgotPassword.label}</Link> */}
          <Link to="/rejestracja">{loginText.loginFields.noAccount.label}</Link>
        </div>
        {/* <div className="register--checkbox login--checkbox">
          <label
            className="input--label"
            htmlFor={loginText.loginFields.rememberMe.id}
          >
            {loginText.loginFields.rememberMe.label}
          </label>
          <input
            className="input--checkbox"
            type="checkbox"
            disabled={inputsDisabled}
            id={loginText.loginFields.rememberMe.id}
            name={loginText.loginFields.rememberMe.name}
          />
        </div> */}
        <input
          className="input--input login--submit input--submit__primary"
          type="submit"
          disabled={inputsDisabled}
          value={
            inputsDisabled ? loginText.button.disabled : loginText.button.acitve
          }
          onClick={handleTrySubmit}
        />
      </form>
    </div>
  );
}

export default LoginPage;
