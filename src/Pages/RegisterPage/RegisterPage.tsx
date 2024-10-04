import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import text from "../../Assets/text.json";
import AuthenticationService from "../../Services/AuthenticationService";
import Alert from "../../Components/Alert/Alert";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import Page from "../../Components/Page/Page";
import { PageText } from "./types";
import Input from "../../Components/Input/Input";
import getEventStatus, { EventStatus } from "../../Utils/getEventStatus";
import replacePlaceholders from "../../Utils/replacePlaceholders";
import dateFormat, { DateFormat } from "../../Utils/dateFormat";
import { registrationStartDate } from "../../Constants/Dates";
import closeIcon from "../../Assets/close-cross.svg";
import { RegisterTeamRequestBody } from "../../Types/requests";
import { useNavigate } from "react-router-dom";
import { ErrorBodyResponse } from "../../Types/responses";
import { EmailRegex } from "../../Constants/Regex";

interface Props { }

function RegisterPage(props: Props) {
  const pageText: PageText = text.register;
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [pickedEmails, setPickedEmails] = useState<string[]>([]);
  const [emailsError, setEmailsError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const pickedEmails = document.getElementsByClassName("input__field--picked") as HTMLCollectionOf<HTMLInputElement>;
    if (pickedEmails.length > 0) {
      for (let i = 0; i < pickedEmails.length; i++) {
        const valueLength = pickedEmails[i].value.length;
        const paddingLeft = window.getComputedStyle(pickedEmails[i]).getPropertyValue("padding-left");
        const paddingRight = window.getComputedStyle(pickedEmails[i]).getPropertyValue("padding-right");
        pickedEmails[i].style.width = `calc(${valueLength + 1}ch + ${paddingLeft} + ${paddingRight})`;
      }
    }
  }, [pickedEmails]);

  const handleIconClick = (email: string) => {
    setPickedEmails((prev) => [...prev, email]);
    setEmailsError(null);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.currentTarget;
    const teamName = form.querySelector("input[name='teamName']") as HTMLInputElement;

    teamName.reportValidity();
    if (!teamName.checkValidity()) {
      return;
    }

    const emailInputs = form.querySelectorAll("input[name^='email']") as NodeListOf<HTMLInputElement>;
    let emails = Array.from(emailInputs).map((input) => input.value);


    const emailInput = emails[0];
    emails = emails.slice(1, emails.length);

    setEmailsError(null);

    if (emails.length < 2) {
      setEmailsError("W drużynie muszą być co najmniej 2 osoby");
      return;
    }

    if (emailInput !== "") {
      setEmailsError("Pole email musi być puste. Jeżeli chcesz dodać więcej osób do drużyny, użyj przycisku z ikoną plusa");
      return;
    }

    const uniqueEmails = new Set(emails);
    if (uniqueEmails.size !== emails.length) {
      setEmailsError("Musisz podać unikalne adresy email");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    const body: RegisterTeamRequestBody = {
      teamName: data.teamName as string,
      teamMembersEmails: emails,
    };

    setInputsDisabled(true);

    AuthenticationService.registerTeam(body)
      .then((response) => {
        if (response.ok) {
          navigate(`/sukces/rejestracja`);
        } else {
          response.json().then((data: ErrorBodyResponse) => {
            setSubmitError(data.error);
            setInputsDisabled(false);
          }).catch(() => {
            setSubmitError("Błąd serwera");
            setInputsDisabled(false);
          });
        }
      })
      .catch(() => {
        setSubmitError("Błąd połączenia z serwerem");
        setInputsDisabled(false);
      });
  }

  return (
    <Page
      pageTitle={pageText.meta.title}
      description={pageText.meta.description}
      noIndex={getEventStatus() !== EventStatus.RegistrationOpen}
    >
      <div className="register">
        {submitError &&
          <Alert
            title="Błąd"
            description="Wystąpił błąd podczas rejestracji:"
            message={submitError}
            buttonOneText="Spróbuj ponownie"
            buttonOneAction={() => { setSubmitError(""); }}
          />
        }
        <div className="register--content pagewidth">
          <div className="register--heading">
            {
              getEventStatus() === EventStatus.CloseToRegistration && (
                <>
                  <h2 className="header__yellow">{pageText.closeToRegistration.title}</h2>
                  <h6>{replacePlaceholders(pageText.closeToRegistration.description, ["HackArenę 2.0", dateFormat(registrationStartDate, DateFormat.DATE)])}</h6>
                  <SocialMedia />
                </>
              )
            }
            {
              getEventStatus() === EventStatus.RegistrationOpen && (
                <>
                  <h2 className="header__yellow">{pageText.registrationOpen.title}</h2>
                  <h6>{pageText.registrationOpen.description}</h6>
                </>
              )
            }
            {
              (getEventStatus() === EventStatus.RegistrationClosed || getEventStatus() === EventStatus.EventLive) &&
              <>
                <h2 className="header__yellow">{pageText.registrationClosed.title}</h2>
                <h6>{replacePlaceholders(pageText.registrationClosed.description, "HackArenę 2.0")}</h6>
                <SocialMedia />
              </>
            }
            {
              (getEventStatus() === EventStatus.EventDone || getEventStatus() === EventStatus.Default) &&
              <>
                <h2 className="header__yellow">{pageText.default.title}</h2>
                <h6>{pageText.default.description}</h6>
                <SocialMedia />
              </>
            }
          </div>
          {
            getEventStatus() === EventStatus.RegistrationOpen && (
              <form id="register_form" className="section--column-0" onSubmit={handleSubmit} noValidate>
                <Input pageText={pageText.registrationOpen.form.teamName} id="team_name" name="teamName" showError={showErrors} minLength={1} maxLength={40} inputDisabled={inputsDisabled} />
                <Input pageText={pageText.registrationOpen.form.email} id="email" name="email" type="email" icon="/Assets/add-circle.svg" onIconClick={handleIconClick} showError={false} maxLength={60} inputDisabled={inputsDisabled || pickedEmails.length === 3} pattern={EmailRegex} />
                <div className={`register__emails${pickedEmails.length > 0 ? " register__email--margin-bottom" : ""}`}>
                  {
                    pickedEmails.map((email, index) => (
                      <div className="input__wrapper" key={index}>
                        <input type="email" name={`email_${index}`} readOnly disabled={inputsDisabled} className="input__element input__field input__field--picked" value={email} />
                        <img src={closeIcon} alt="Usuń" className={inputsDisabled ? "not-clickable" : ""} onClick={(e) => {
                          // delete email from pickedEmails of index index
                          const newPickedEmails = pickedEmails.filter((_, i) => i !== index);
                          setPickedEmails(newPickedEmails);
                        }} />
                      </div>
                    ))
                  }
                </div>
                <input type="submit" className="input__element input__button" onClick={() => setShowErrors(true)} disabled={inputsDisabled} value={inputsDisabled ? pageText.registrationOpen.form.submit.disabled : pageText.registrationOpen.form.submit.active} />
                <span className={`input__span${emailsError ? " input__span--visible" : ""}`}>{emailsError}</span>
              </form>
            )
          }
        </div>
      </div>
    </Page>
  );
}

export default RegisterPage;
