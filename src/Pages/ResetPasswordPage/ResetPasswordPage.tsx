import "./ResetPasswordPage.css";
import { FormEvent, useState } from "react";
import text from "../../Assets/text.json";
import AuthenticationService from "../../Services/AuthenticationService";
import { useNavigate } from "react-router";
import Alert from "../../Components/Alert/Alert";
import Page from "../../Components/Page/Page";
import { PageText } from "./types";
import Input from "../../Components/Input/Input";

interface Props { }

type ResetPasswordValues = {
  password: string;
  repeatPassword: string;
};

function ResetPasswordPage(props: Props) {
  const pageText: PageText = text.resetPassword;
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(Object.fromEntries(data));
    setInputsDisabled(true);
  };

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
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
        <h2 className="header header__yellow">{pageText.title}</h2>
        <form onSubmit={handleSubmit} className="section--column-0">
          <Input pageText={pageText.formFields.email} id="email" name="email" type="email" showError={showErrors} maxLength={100} inputDisabled={inputsDisabled} />
          <div className="section--row-1">
            <Input pageText={pageText.formFields.password} id="password" name="password" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} />
            <Input pageText={pageText.formFields.repeatPassword} id="repeat_password" name="repeatPassword" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} />
          </div>
          <input type="submit" className="input__element input__button" onClick={() => setShowErrors(true)} disabled={inputsDisabled} value={inputsDisabled ? pageText.button.disabled : pageText.button.active} />
        </form>
      </div>
    </Page>
  );
}

export default ResetPasswordPage;
