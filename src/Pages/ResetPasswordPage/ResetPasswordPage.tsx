import "./ResetPasswordPage.css";
import { FormEvent, useState } from "react";
import { handleErrorMessages } from "../../Utils/handleErrorMessages";
import text from "../../Assets/text.json";
import AuthenticationService from "../../Services/AuthenticationService";
import { useNavigate } from "react-router";
import Alert from "../../Components/Alert/Alert";

interface Props { }

type ResetPasswordValues = {
  password: string;
  repeatPassword: string;
};

function ResetPasswordPage(props: Props) {
  const resetPasswordText = text.resetPassword;
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<ResetPasswordValues>({
    password: "",
    repeatPassword: "",
  });
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleTrySubmit = () => {
    setShowErrors(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputsDisabled(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: ResetPasswordValues = {
      password: formData.get("password") as string,
      repeatPassword: formData.get(
        resetPasswordText.formFields.repeatPassword.name
      ) as string,
    };

    if (data.password !== data.repeatPassword) {
      setErrors((prev) => ({
        ...prev,
        repeatPassword:
          resetPasswordText.formFields.repeatPassword.errorMessage,
      }));
      setInputsDisabled(false);
      return;
    } else {
      AuthenticationService.resetPassword({ password: data.password })
        .then((response) => {
          setInputsDisabled(false);
          if (response.status === 202) {
            navigate("/reset/sukces");
          }
          else {
            setSubmitError("Wystąpił błąd podczas resetowania hasła")
          }
        })
        .catch((error) => {
          setSubmitError("Wystąpił błąd podczas resetowania hasła")
        })
    }
  };

  return (
    <div className="reset pagewidth">
      {
        submitError &&
        <Alert
          title="Błąd"
          message={submitError}
          buttonOneAction={() => setSubmitError(null)}
          buttonOneText="Spróbuj ponownie"
        />
      }
      <h2>{resetPasswordText.title}</h2>
      <form onSubmit={handleSubmit} className="login--form">

        <div className="login--input">
          {/* <label className="input--label" htmlFor="password">
            Hasło:
          </label> */}
          <input
            onInvalid={(e) => {
              e.preventDefault();

              handleErrorMessages<ResetPasswordValues>(
                e.currentTarget,
                resetPasswordText.formFields.password.errorMessage,
                setErrors
              );
            }}
            onChange={(e) => {
              handleErrorMessages<ResetPasswordValues>(
                e.currentTarget,
                resetPasswordText.formFields.password.errorMessage,
                setErrors
              );
            }}
            disabled={inputsDisabled}
            type="password"
            id={resetPasswordText.formFields.password.id}
            placeholder={resetPasswordText.formFields.password.label}
            name={resetPasswordText.formFields.password.name}
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
        <div className="login--input">
          {/* <label className="input--label" htmlFor="repeatpassword">
            Hasło:
          </label> */}
          <input
            onInvalid={(e) => {
              e.preventDefault();

              handleErrorMessages<ResetPasswordValues>(
                e.currentTarget,
                resetPasswordText.formFields.repeatPassword.errorMessage,
                setErrors
              );
            }}
            onChange={(e) => {
              handleErrorMessages<ResetPasswordValues>(
                e.currentTarget,
                resetPasswordText.formFields.repeatPassword.errorMessage,
                setErrors
              );
            }}
            disabled={inputsDisabled}
            type="password"
            id={resetPasswordText.formFields.repeatPassword.id}
            placeholder={resetPasswordText.formFields.repeatPassword.label}
            name={resetPasswordText.formFields.repeatPassword.name}
            className={`input--input${errors.repeatPassword && showErrors ? " input--input__error" : ""
              }`}
            pattern=".*"
          />
          <span
            className={`input--span${showErrors ? " input--span__visible" : ""
              }`}
          >
            {errors.repeatPassword}
          </span>
        </div>
        <input
          className="input--input reset--submit input--submit__primary"
          type="submit"
          value={
            inputsDisabled
              ? resetPasswordText.button.disabled
              : resetPasswordText.button.active
          }
          disabled={inputsDisabled}
          onClick={handleTrySubmit}
        />
      </form>
    </div>
  );
}

export default ResetPasswordPage;
