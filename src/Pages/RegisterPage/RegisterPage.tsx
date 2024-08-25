import React, { useState } from "react";
import "./RegisterPage.css";
import text from "../../Assets/text.json";
import {
  handleErrorMessages,
  handleErrorMessagesTeamMembers,
} from "../../Utils/handleErrorMessages";
import { InputTeam, InputErrors, RegisterBody } from "../../Types/types";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../Services/AuthenticationService";
import Alert from "../../Components/Alert/Alert";
import isRegistrationOpen from "../../Utils/isRegistrationOpen"
import FacebookIcon from "../../Assets/facebook.svg";
import InstagramIcon from "../../Assets/instagram.svg";
import LinkedInIcon from "../../Assets/linkedin.svg";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import Page from "../../Components/Page/Page";
import { PageText } from "./types";

interface Props { }

function RegisterPage(props: Props) {
  const navigate = useNavigate();
  const pageText: PageText = text.register;
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const [values, setValues] = useState<InputTeam>({
    teamName: "",
    password: "",
    repeatPassword: "",
    teamMembers: [
      {
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        occupation: "Student",
        isVegan: false,
        agreement: false,
      },
    ],
  });
  const [errors, setErrors] = React.useState<InputErrors>({
    teamName: "",
    password: "",
    repeatPassword: "",
    teamMembers: [
      {
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        occupation: "",
        agreement: "",
      },
    ],
  });

  const handleTrySubmit = () => {
    setShowErrors(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (values.password !== values.repeatPassword) {
      setErrors((prev) => ({
        ...prev,
        repeatPassword: pageText.registerFields.repeatPassword.errorMessage,
      }));
      return;
    } else {
      setInputsDisabled(true);
      AuthenticationService.register(values)
        .then((response) => {
          setInputsDisabled(false);
          if (response.status === 201) {
            const token = response.headers.get("Authorization");
            console.log(token);
            navigate("/rejestracja/sukces");
          }
          else if (response.status === 409) {
            response.json().then((data) => {
              if (data.error === "Cannot create new team, duplicate") {
                let errorMessage = "Użyty email jest już zarejestrowany lub nazwa zespołu jest zajęta";
                setSubmitError(errorMessage);
              }
            });
          }
          else {
            setSubmitError("Wystąpił błąd podczas rejestracji");
          }
        })
        .catch((error) => {
          setSubmitError("Wystąpił błąd podczas rejestracji");
        });
    }
  };

  const handleAddTeamMember = () => {
    setValues({
      ...values,
      teamMembers: [
        ...values.teamMembers,
        {
          firstName: "",
          lastName: "",
          email: "",
          dateOfBirth: "",
          occupation: "Student",
          isVegan: false,
          agreement: false,
        },
      ],
    });

    setErrors({
      ...errors,
      teamMembers: [
        ...errors.teamMembers,
        {
          firstName: "",
          lastName: "",
          email: "",
          dateOfBirth: "",
          occupation: "",
          agreement: "",
        },
      ],
    });
  };

  const handleDeleteTeamMember = (index: number) => {
    setValues({
      ...values,
      teamMembers: [
        ...values.teamMembers.slice(0, index),
        ...values.teamMembers.slice(index + 1),
      ],
    });

    setErrors({
      ...errors,
      teamMembers: [
        ...errors.teamMembers.slice(0, index),
        ...errors.teamMembers.slice(index + 1),
      ],
    });
  };

  return (
    <Page
      pageTitle={pageText.meta.title}
      description={isRegistrationOpen() ? pageText.meta.description : pageText.closed.description}
      noIndex={isRegistrationOpen()}
    >
      <div className="register">
        {submitError &&
          <Alert
            title="Błąd"
            message={submitError}
            buttonOneText="Spróbuj ponownie"
            buttonOneAction={() => { setSubmitError(""); }}
          />
        }
        <div className="register--content pagewidth">
          <div className="register--heading">
            {
              isRegistrationOpen() ?
                <>
                  <h1 className="header__white">{pageText.title}</h1>
                  <h5>{pageText.description}</h5>
                </>
                :
                <>
                  <h2 className="header__yellow">{pageText.closed.title}</h2>
                  <h6>{pageText.closed.description}</h6>
                  <SocialMedia />
                </>
            }
          </div>
          {
            isRegistrationOpen() &&
            <form className="register--form" onSubmit={handleSubmit}>
              {/* TEAM NAME */}
              <div className="register--input">
                <label
                  htmlFor={pageText.registerFields.teamName.id}
                  className="input--label"
                >
                  {pageText.registerFields.teamName.label}
                </label>
                <input
                  className={`input--input${errors.teamName && showErrors ? " input--input__error" : ""
                    }`}
                  placeholder={pageText.registerFields.teamName.label}
                  name={pageText.registerFields.teamName.name}
                  id={pageText.registerFields.teamName.id}
                  type="text"
                  disabled={inputsDisabled}
                  pattern="[^\/]*$"
                  onInvalid={(e) => {
                    handleErrorMessages<InputErrors>(
                      e.currentTarget,
                      pageText.registerFields.teamName.errorMessage,
                      setErrors
                    );
                    e.preventDefault();
                  }}
                  spellCheck="false"
                  value={values.teamName}
                  onChange={(e) => {
                    setValues({ ...values, teamName: e.currentTarget.value });
                    handleErrorMessages<InputErrors>(
                      e.currentTarget,
                      pageText.registerFields.teamName.errorMessage,
                      setErrors
                    );
                  }}
                  required
                  minLength={2}
                  maxLength={40}
                />
                <span
                  className={`input--span${showErrors ? " input--span__visible" : ""
                    }`}
                >
                  {errors.teamName}
                </span>
              </div>
              <div className="register--column">
                {/* PASSWORD */}
                <div className="register--input">
                  <label
                    htmlFor={pageText.registerFields.password.id}
                    className="input--label"
                  >
                    {pageText.registerFields.password.label}
                  </label>
                  <input
                    className={`input--input${errors.password && showErrors ? " input--input__error" : ""
                      }`}
                    placeholder={pageText.registerFields.password.label}
                    name={pageText.registerFields.password.name}
                    id={pageText.registerFields.password.id}
                    type="password"
                    disabled={inputsDisabled}
                    pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
                    onInvalid={(e) => {
                      handleErrorMessages<InputErrors>(
                        e.currentTarget,
                        pageText.registerFields.password.errorMessage,
                        setErrors
                      );
                      e.preventDefault();
                    }}
                    value={values.password}
                    onChange={(e) => {
                      setValues({ ...values, password: e.currentTarget.value });
                      handleErrorMessages<InputErrors>(
                        e.currentTarget,
                        pageText.registerFields.password.errorMessage,
                        setErrors
                      );
                    }}
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
                {/* REPEAT PASSWORD */}
                <div className="register--input">
                  <label
                    htmlFor={pageText.registerFields.repeatPassword.id}
                    className="input--label"
                  >
                    {pageText.registerFields.repeatPassword.label}
                  </label>
                  <input
                    className={`input--input${errors.repeatPassword && showErrors
                      ? " input--input__error"
                      : ""
                      }`}
                    placeholder={pageText.registerFields.repeatPassword.label}
                    name={pageText.registerFields.repeatPassword.name}
                    id={pageText.registerFields.repeatPassword.id}
                    type="password"
                    disabled={inputsDisabled}
                    pattern=".*"
                    onInvalid={(e) => {
                      handleErrorMessages<InputErrors>(
                        e.currentTarget,
                        pageText.registerFields.repeatPassword.errorMessage,
                        setErrors
                      );
                      e.preventDefault();
                    }}
                    value={values.repeatPassword}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        repeatPassword: e.currentTarget.value,
                      });
                      handleErrorMessages<InputErrors>(
                        e.currentTarget,
                        pageText.registerFields.repeatPassword.errorMessage,
                        setErrors
                      );
                    }}
                  />
                  <span
                    className={`input--span${showErrors ? " input--span__visible" : ""
                      }`}
                  >
                    {errors.repeatPassword}
                  </span>
                </div>
              </div>

              <div className="register--addfriend">
                {/* ADD FRIEND */}
                <h4>{pageText.teamMembers}</h4>
                {values.teamMembers.map((_, index) => (
                  <div key={index} className="register--innerform">
                    <h5>
                      {pageText.teamMember} {index + 1}
                    </h5>
                    <div className="register--column">
                      {/* FIRST NAME */}
                      <div className="register--input">
                        <label
                          htmlFor={pageText.registerFields.firstName.id + index}
                          className="input--label"
                        >
                          {pageText.registerFields.firstName.label}
                        </label>
                        <input
                          className={`input--input${errors.teamMembers[index].firstName && showErrors
                            ? " input--input__error"
                            : ""
                            }`}
                          placeholder={pageText.registerFields.firstName.label}
                          name={pageText.registerFields.firstName.name + index}
                          id={pageText.registerFields.firstName.id + index}
                          type="text"
                          disabled={inputsDisabled}
                          pattern="^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ \-]*$"
                          onInvalid={(e) => {
                            handleErrorMessagesTeamMembers(
                              e.currentTarget,
                              pageText.registerFields.firstName.errorMessage,
                              setErrors,
                              index
                            );
                            e.preventDefault();
                          }}
                          spellCheck="false"
                          value={values.teamMembers[index].firstName}
                          onChange={(e) => {
                            let teamMemberData = values.teamMembers[index];
                            teamMemberData.firstName = e.currentTarget.value;

                            setValues({
                              ...values,
                              teamMembers: [
                                ...values.teamMembers.slice(0, index),
                                teamMemberData,
                                ...values.teamMembers.slice(index + 1),
                              ],
                            });
                            handleErrorMessagesTeamMembers(
                              e.currentTarget,
                              pageText.registerFields.firstName.errorMessage,
                              setErrors,
                              index
                            );
                          }}
                          required
                          minLength={2}
                          maxLength={50}
                        />
                        <span
                          className={`input--span${showErrors ? " input--span__visible" : ""
                            }`}
                        >
                          {errors.teamMembers[index].firstName}
                        </span>
                      </div>
                      {/* LAST NAME */}
                      <div className="register--input">
                        <label
                          htmlFor={pageText.registerFields.lastName.id + index}
                          className="input--label"
                        >
                          {pageText.registerFields.lastName.label}
                        </label>
                        <input
                          className={`input--input${errors.teamMembers[index].lastName && showErrors
                            ? " input--input__error"
                            : ""
                            }`}
                          placeholder={pageText.registerFields.lastName.label}
                          name={pageText.registerFields.lastName.name + index}
                          id={pageText.registerFields.lastName.id + index}
                          type="text"
                          disabled={inputsDisabled}
                          pattern="^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ \-]*$"
                          onInvalid={(e) => {
                            handleErrorMessagesTeamMembers(
                              e.currentTarget,
                              pageText.registerFields.lastName.errorMessage,
                              setErrors,
                              index
                            );
                            e.preventDefault();
                          }}
                          spellCheck="false"
                          value={values.teamMembers[index].lastName}
                          onChange={(e) => {
                            let teamMemberData = values.teamMembers[index];
                            teamMemberData.lastName = e.currentTarget.value;

                            setValues({
                              ...values,
                              teamMembers: [
                                ...values.teamMembers.slice(0, index),
                                teamMemberData,
                                ...values.teamMembers.slice(index + 1),
                              ],
                            });
                            handleErrorMessagesTeamMembers(
                              e.currentTarget,
                              pageText.registerFields.lastName.errorMessage,
                              setErrors,
                              index
                            );
                          }}
                          required
                          minLength={2}
                          maxLength={50}
                        />
                        <span
                          className={`input--span${showErrors ? " input--span__visible" : ""
                            }`}
                        >
                          {errors.teamMembers[index].lastName}
                        </span>
                      </div>
                    </div>
                    {/* EMAIL */}
                    <div className="register--input">
                      <label
                        htmlFor={pageText.registerFields.email.id + index}
                        className="input--label"
                      >
                        {pageText.registerFields.email.label}
                      </label>
                      <input
                        className={`input--input${errors.teamMembers[index].email && showErrors
                          ? " input--input__error"
                          : ""
                          }`}
                        placeholder={pageText.registerFields.email.label}
                        name={pageText.registerFields.email.name + index}
                        id={pageText.registerFields.email.id + index}
                        type="email"
                        disabled={inputsDisabled}
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        onInvalid={(e) => {
                          handleErrorMessagesTeamMembers(
                            e.currentTarget,
                            pageText.registerFields.email.errorMessage,
                            setErrors,
                            index
                          );
                          e.preventDefault();
                        }}
                        spellCheck="false"
                        value={values.teamMembers[index].email}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            teamMembers: [
                              ...values.teamMembers.slice(0, index),
                              {
                                ...values.teamMembers[index],
                                email: e.currentTarget.value,
                              },
                              ...values.teamMembers.slice(index + 1),
                            ],
                          } as InputTeam);
                          handleErrorMessagesTeamMembers(
                            e.currentTarget,
                            pageText.registerFields.email.errorMessage,
                            setErrors,
                            index
                          );
                        }}
                        required
                        maxLength={60}
                      />
                      <span
                        className={`input--span${showErrors ? " input--span__visible" : ""
                          }`}
                      >
                        {errors.teamMembers[index].email}
                      </span>
                    </div>
                    <div className="register--column">
                      {/* DATE OF BIRTH */}
                      <div className="register--input">
                        <label
                          htmlFor={pageText.registerFields.dateOfBirth.id + index}
                          className="input--label"
                        >
                          {pageText.registerFields.dateOfBirth.label}
                        </label>
                        <input
                          className={`input--input${errors.teamMembers[index].dateOfBirth && showErrors
                            ? " input--input__error"
                            : ""
                            }`}
                          placeholder={pageText.registerFields.dateOfBirth.label}
                          name={pageText.registerFields.dateOfBirth.name + index}
                          id={pageText.registerFields.dateOfBirth.id + index}
                          type="date"
                          disabled={inputsDisabled}
                          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                          onInvalid={(e) => {
                            handleErrorMessagesTeamMembers(
                              e.currentTarget,
                              pageText.registerFields.dateOfBirth.errorMessage,
                              setErrors,
                              index
                            );
                            e.preventDefault();
                          }}
                          spellCheck="false"
                          value={values.teamMembers[index].dateOfBirth}
                          onChange={(e) => {
                            setValues({
                              ...values,
                              teamMembers: [
                                ...values.teamMembers.slice(0, index),
                                {
                                  ...values.teamMembers[index],
                                  dateOfBirth: e.currentTarget.value,
                                },
                                ...values.teamMembers.slice(index + 1),
                              ],
                            });
                            handleErrorMessagesTeamMembers(
                              e.currentTarget,
                              pageText.registerFields.dateOfBirth.errorMessage,
                              setErrors,
                              index
                            );
                          }}
                          required
                          max="2017-01-01"
                        />
                        <span
                          className={`input--span${showErrors ? " input--span__visible" : ""
                            }`}
                        >
                          {errors.teamMembers[index].dateOfBirth}
                        </span>
                      </div>
                      {/* OCCUPATION */}
                      <div className="register--input">
                        <label
                          htmlFor={pageText.registerFields.occupation.id + index}
                        >
                          {pageText.registerFields.occupation.label}
                        </label>
                        <select
                          name="occupation"
                          className="input--select input--input"
                          disabled={inputsDisabled}
                          id={pageText.registerFields.occupation.id + index}
                          value={values.teamMembers[index].occupation}
                          onChange={(e) => {
                            setValues({
                              ...values,
                              teamMembers: [
                                ...values.teamMembers.slice(0, index),
                                {
                                  ...values.teamMembers[index],
                                  occupation: e.currentTarget.value,
                                },
                                ...values.teamMembers.slice(index + 1),
                              ],
                            });
                          }}
                        >
                          {pageText.registerFields.occupation.occupationChoices.map(
                            (option, index) => (
                              <option value={option} key={index}>
                                {option}
                              </option>
                            )
                          )}
                        </select>
                        <span
                          className={`input--span${showErrors ? " input--span__visible" : ""
                            }`}
                        >
                          {errors.teamMembers[index].occupation}
                        </span>
                      </div>
                    </div>
                    {/* IS VEGAN */}
                    <div
                      className="register--checkbox"
                      style={{ marginTop: "0.5rem" }}
                    >
                      <label
                        htmlFor={pageText.registerFields.vegan.id + index}
                        className="input--label"
                      >
                        {pageText.registerFields.vegan.label}
                      </label>
                      <input
                        className={`input--checkbox
                  `}
                        onChange={() => {
                          setValues({
                            ...values,
                            teamMembers: [
                              ...values.teamMembers.slice(0, index),
                              {
                                ...values.teamMembers[index],
                                isVegan: !values.teamMembers[index].isVegan,
                              },
                              ...values.teamMembers.slice(index + 1),
                            ],
                          });
                        }}
                        name={pageText.registerFields.vegan.name + index}
                        id={pageText.registerFields.vegan.id + index}
                        type="checkbox"
                        disabled={inputsDisabled}
                      />
                    </div>
                    {/* AGREEMENT */}
                    <div className="register--checkbox">
                      <label
                        htmlFor={pageText.registerFields.agreement.id + index}
                        className="input--label"
                      >
                        {pageText.registerFields.agreement.label}
                      </label>
                      <input
                        className={`input--checkbox${showErrors && errors.teamMembers[index].agreement
                          ? " input--checkbox__error"
                          : ""
                          }
                  `}
                        onChange={(e) => {
                          handleErrorMessagesTeamMembers(
                            e.currentTarget,
                            pageText.registerFields.agreement.errorMessage,
                            setErrors,
                            index
                          );
                          setValues({
                            ...values,
                            teamMembers: [
                              ...values.teamMembers.slice(0, index),
                              {
                                ...values.teamMembers[index],
                                agreement: !values.teamMembers[index].agreement,
                              },
                              ...values.teamMembers.slice(index + 1),
                            ],
                          });
                        }}
                        onInvalid={(e) => {
                          handleErrorMessagesTeamMembers(
                            e.currentTarget,
                            pageText.registerFields.agreement.errorMessage,
                            setErrors,
                            index
                          );
                          e.preventDefault();
                        }}
                        name={pageText.registerFields.agreement.name + index}
                        id={pageText.registerFields.agreement.id + index}
                        type="checkbox"
                        disabled={inputsDisabled}
                        required
                      />
                    </div>
                    <div className="register--memberbuttons">
                      {values.teamMembers.length > 1 && (
                        <input
                          className="input--submit input--input input--submit__primary"
                          type="button"
                          disabled={inputsDisabled}
                          value="-"
                          onClick={() => handleDeleteTeamMember(index)}
                        />
                      )}
                      {index === values.teamMembers.length - 1 &&
                        values.teamMembers.length < 3 && (
                          <input
                            className="input--submit input--input input--submit__primary"
                            type="button"
                            disabled={inputsDisabled}
                            value="+"
                            onClick={handleAddTeamMember}
                          />
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <input
                className="input--input input--submit input--submit__primary"
                type="submit"
                value={
                  inputsDisabled ? pageText.button.disabled : pageText.button.active
                }
                onClick={handleTrySubmit}
                disabled={inputsDisabled}
              />
            </form>}
        </div>
      </div>
    </Page>
  );
}

export default RegisterPage;
