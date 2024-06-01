import "./AccountPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { AccountTeam, AccountTeamRequestBody, InputErrors } from "../../Types/types";
import React, { useEffect, useState } from "react";
import text from "../../Assets/text.json";
import {
  handleErrorMessages,
  handleErrorMessagesTeamMembers,
} from "../../Utils/handleErrorMessages";
import isEventLive from "../../Utils/isEventLive";
import FileUploader from "../../Components/FileUploader/FileUploader";
import useWindowWidth from "../../Hooks/useWindowWidth";
import Alert from "../../Components/Alert/Alert";
import AccountService from "../../Services/AccountService";
import AuthenticationService from "../../Services/AuthenticationService";
import isRegistrationOpen from "../../Utils/isRegistrationOpen";
import JSZip from "jszip";

interface Props { }

// const teamData: AccountTeam = {
//   teamName: "Big cocks",
//   teamMembers: [
//     {
//       firstName: "John",
//       lastName: "Doe",
//       email: "johndoe@gamil.com",
//       dateOfBirth: "2000-01-01",
//       occupation: "Student",
//       isVegan: true,
//       agreement: true,
//     },
//     {
//       firstName: "Jane",
//       lastName: "Doe",
//       email: "janedoe@gmail.com",
//       dateOfBirth: "2000-01-02",
//       occupation: "Uczeń",
//       isVegan: false,
//       agreement: true,
//     },
//   ],
// };

function AccountPage(props: Props) {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const accountText = text.account;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState<string | null>(null);

  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);

  const [values, setValues] = useState<AccountTeam>({
    teamName: "",
    teamMembers: [],

  });
  const [valuesBackup, setValuesBackup] = useState<AccountTeam>({
    teamName: "",
    teamMembers: [],

  });
  const [errors, setErrors] = useState<InputErrors>({
    teamName: "",
    password: "",
    repeatPassword: "",
    teamMembers: []
  })

  const { zespolID } = useParams<{ zespolID: string }>();

  useEffect(() => {
    if (zespolID) {
      AccountService.getTeam(zespolID).then((response) => {
        if (response.status === 200) {
          response.json().then((team: AccountTeam) => {
            team.teamMembers.forEach((teamMember) => {
              teamMember.dateOfBirth = teamMember.dateOfBirth.split("T")[0];
            });
            setValues(team);
            setValuesBackup(team);
            setErrors({
              teamName: "",
              password: "",
              repeatPassword: "",
              teamMembers: team.teamMembers.map(() => {
                return {
                  firstName: "",
                  lastName: "",
                  email: "",
                  dateOfBirth: '',
                  occupation: "",
                  agreement: "",
                }
              })
            })
          })
        }
        else {
          setAlertErrorMessage("Wystąpił błąd podczas pobierania danych z serwera")
        }

      })
        .catch((error) => {
          setAlertErrorMessage("Wystąpił błąd podczas pobierania danych z serwera")
        });
    }
  }, [])

  const handleTrySubmit = () => {
    setShowErrors(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const teamData = {
      teamName: values.teamName,
      teamMembers: values.teamMembers.map((teamMember) => {
        return {
          firstName: teamMember.firstName,
          lastName: teamMember.lastName,
          email: teamMember.email,
          dateOfBirth: new Date(teamMember.dateOfBirth),
          occupation: teamMember.occupation,
          isVegan: teamMember.isVegan,
          agreement: teamMember.agreement,
        };
      }),
    } as AccountTeamRequestBody;
    AccountService.updateTeam(valuesBackup.teamName, teamData).then((response) => {
      setInputsDisabled(true);
      if (response.status === 200) {
        localStorage.setItem("teamID", values.teamName);
        setValuesBackup({ ...values, teamMembers: [...values.teamMembers] });
        setShowErrors(false);
        navigate("/konto/" + values.teamName)
      } else {
        setAlertErrorMessage("Wystąpił błąd podczas zapisywania danych na serwerze")
      }
    }).catch(() => {
      setAlertErrorMessage("Wystąpił błąd podczas zapisywania danych na serwerze")
    })
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

  const hangleLogOut = () => {
    AuthenticationService.logout().then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("teamID");
        navigate("/");
      } else {
        setAlertErrorMessage("Wystąpił błąd podczas wylogowywania")
      }
    }).catch(() => {
      setAlertErrorMessage("Wystąpił błąd podczas wylogowywania")
    });
  }

  const handleDeleteTeamMember = (index: number) => {
    setValues({
      ...values,
      teamMembers: [
        ...values.teamMembers.slice(0, index),
        ...values.teamMembers.slice(index + 1),
      ],
    } as AccountTeam);

    setErrors({
      ...errors,
      teamMembers: [
        ...errors.teamMembers.slice(0, index),
        ...errors.teamMembers.slice(index + 1),
      ],
    });
  };

  const handleEditForm = () => {
    setInputsDisabled(!inputsDisabled);
    setShowErrors(false);
    if (inputsDisabled) {
      setValuesBackup({ ...values, teamMembers: [...values.teamMembers] });
    } else {
      setValues({
        ...valuesBackup,
        teamMembers: [...valuesBackup.teamMembers],
      });
      setErrors({
        teamName: "",
        password: "",
        repeatPassword: "",
        teamMembers: values.teamMembers.map(() => ({
          firstName: "",
          lastName: "",
          email: "",
          dateOfBirth: "",
          occupation: "",
          agreement: "",
        })),
      });
    }
  };

  const handleUpdateTeam = () => {
    handleTrySubmit();

  }

  const handleDeleteTeam = () => {
    //TODO: delete team
    localStorage.removeItem("teamID");
    navigate("/");
  }

  return (
    <div className="account pagewidth">
      {
        alertErrorMessage &&
        <Alert
          title="Błąd"
          message={alertErrorMessage}
          buttonOneText="Zamknij"
          buttonOneAction={() => setAlertErrorMessage(null)}
        />
      }
      <form className="register--form" onSubmit={handleSubmit}>
        {/* TEAM NAME */}
        <div className="account--header">
          <div className="register--input">
            <input
              className={`account--input account--input__header${errors.teamName && showErrors ? " account--input__error" : ""
                }`}
              placeholder={accountText.registerFields.teamName.label}
              name={accountText.registerFields.teamName.name}
              id={accountText.registerFields.teamName.id}
              type="text"
              disabled={inputsDisabled}
              pattern=".*"
              onInvalid={(e) => {
                handleErrorMessages<InputErrors>(
                  e.currentTarget,
                  accountText.registerFields.teamName.errorMessage,
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
                  accountText.registerFields.teamName.errorMessage,
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
          <div className="header--buttons">
            {!inputsDisabled && (
              <input
                className={`account--button${windowWidth < 768 ? " account--button__secondary" : " account--button__primary"}${inputsDisabled ? "" : " account--button__halfborder"
                  }`}
                type="submit"
                value={inputsDisabled ? accountText.buttons.save.disabled : accountText.buttons.save.active}
                onClick={handleTrySubmit}
                disabled={inputsDisabled}
              />
            )}
            {(!isEventLive() && isRegistrationOpen()) && (
              <input
                type="button"
                className={`account--button account--button__primary${inputsDisabled ? "" : " account--button__halfborder"
                  }`}
                onClick={handleEditForm}
                value={inputsDisabled ? accountText.buttons["edit-cancel"].disabled : accountText.buttons["edit-cancel"].active}
              ></input>
            )}
          </div>
        </div>
        <FileUploader />
        <div className="register--addfriend">
          {/* ADD FRIEND */}
          <div className="register--memberbuttons">
            <h4>{accountText.teamMembers}</h4>

            {!inputsDisabled && (
              <input
                className="account--button account--button__primary"
                type="button"
                disabled={inputsDisabled || values.teamMembers.length >= 3}
                value={accountText.buttons.addTeamMember}
                onClick={handleAddTeamMember}
              />
            )}
          </div>
          {values.teamMembers.map((_, index) => (
            <div key={index} className="register--innerform">
              <div className="register--memberbuttons">
                <h5>
                  {accountText.teamMember} {index + 1}
                </h5>

                {!inputsDisabled && values.teamMembers.length > 1 && (
                  <input
                    className="account--button account--button__secondary"
                    type="button"
                    value={accountText.buttons.deleteTeamMember}
                    onClick={() => handleDeleteTeamMember(index)}
                  />
                )}
              </div>
              <div className="register--column">
                {/* FIRST NAME */}
                <div className="register--input">
                  <input
                    className={`account--input${errors.teamMembers[index].firstName && showErrors
                      ? " account--input__error"
                      : ""
                      }`}
                    placeholder={accountText.registerFields.firstName.label}
                    name={accountText.registerFields.firstName.name + index}
                    id={accountText.registerFields.firstName.id + index}
                    type="text"
                    disabled={inputsDisabled}
                    pattern="^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ \-]*$"
                    onInvalid={(e) => {
                      handleErrorMessagesTeamMembers(
                        e.currentTarget,
                        accountText.registerFields.firstName.errorMessage,
                        setErrors,
                        index
                      );
                      e.preventDefault();
                    }}
                    spellCheck="false"
                    value={values.teamMembers[index].firstName}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        teamMembers: [
                          ...values.teamMembers.slice(0, index),
                          {
                            ...values.teamMembers[index],
                            firstName: e.currentTarget.value,
                          },
                          ...values.teamMembers.slice(index + 1),
                        ],
                      } as AccountTeam);

                      handleErrorMessagesTeamMembers(
                        e.currentTarget,
                        accountText.registerFields.firstName.errorMessage,
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
                  <input
                    className={`account--input${errors.teamMembers[index].lastName && showErrors
                      ? " account--input__error"
                      : ""
                      }`}
                    placeholder={accountText.registerFields.lastName.label}
                    name={accountText.registerFields.lastName.name + index}
                    id={accountText.registerFields.lastName.id + index}
                    type="text"
                    disabled={inputsDisabled}
                    pattern="^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ \-]*$"
                    onInvalid={(e) => {
                      handleErrorMessagesTeamMembers(
                        e.currentTarget,
                        accountText.registerFields.lastName.errorMessage,
                        setErrors,
                        index
                      );
                      e.preventDefault();
                    }}
                    spellCheck="false"
                    value={values.teamMembers[index].lastName}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        teamMembers: [
                          ...values.teamMembers.slice(0, index),
                          {
                            ...values.teamMembers[index],
                            lastName: e.currentTarget.value,
                          },
                          ...values.teamMembers.slice(index + 1),
                        ],
                      } as AccountTeam);
                      handleErrorMessagesTeamMembers(
                        e.currentTarget,
                        accountText.registerFields.lastName.errorMessage,
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
                <input
                  className={`account--input${errors.teamMembers[index].email && showErrors
                    ? " account--input__error"
                    : ""
                    }`}
                  placeholder={accountText.registerFields.email.label}
                  name={accountText.registerFields.email.name + index}
                  id={accountText.registerFields.email.id + index}
                  type="email"
                  disabled={inputsDisabled}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  onInvalid={(e) => {
                    handleErrorMessagesTeamMembers(
                      e.currentTarget,
                      accountText.registerFields.email.errorMessage,
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
                    } as AccountTeam);
                    handleErrorMessagesTeamMembers(
                      e.currentTarget,
                      accountText.registerFields.email.errorMessage,
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
                  <input
                    className={`account--input${errors.teamMembers[index].dateOfBirth && showErrors
                      ? " account--input__error"
                      : ""
                      }`}
                    placeholder={accountText.registerFields.dateOfBirth.label}
                    name={accountText.registerFields.dateOfBirth.name + index}
                    id={accountText.registerFields.dateOfBirth.id + index}
                    type="date"
                    disabled={inputsDisabled}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    onInvalid={(e) => {
                      handleErrorMessagesTeamMembers(
                        e.currentTarget,
                        accountText.registerFields.dateOfBirth.errorMessage,
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
                      } as AccountTeam);
                      handleErrorMessagesTeamMembers(
                        e.currentTarget,
                        accountText.registerFields.dateOfBirth.errorMessage,
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
                  <select
                    name="occupation"
                    className="input--select account--select account--input"
                    disabled={inputsDisabled}
                    id={accountText.registerFields.occupation.id + index}
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
                      } as AccountTeam);
                    }}
                  >
                    {accountText.registerFields.occupation.occupationChoices.map(
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
                  htmlFor={accountText.registerFields.vegan.id + index}
                  className="input--label"
                >
                  {accountText.registerFields.vegan.label}
                </label>
                <input
                  className={`account--checkbox
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
                    } as AccountTeam);
                  }}
                  checked={values.teamMembers[index].isVegan}
                  name={accountText.registerFields.vegan.name + index}
                  id={accountText.registerFields.vegan.id + index}
                  type="checkbox"
                  disabled={inputsDisabled}
                />
              </div>
              {/* AGREEMENT */}
              <div className="register--checkbox">
                <label
                  htmlFor={accountText.registerFields.agreement.id + index}
                  className="input--label"
                >
                  {accountText.registerFields.agreement.label}
                </label>
                <input
                  className={`account--checkbox${showErrors && errors.teamMembers[index].agreement
                    ? " account--checkbox__error"
                    : ""
                    }
                  `}
                  onChange={(e) => {
                    handleErrorMessagesTeamMembers(
                      e.currentTarget,
                      accountText.registerFields.agreement.errorMessage,
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
                    } as AccountTeam);
                  }}
                  value={"true"}
                  onInvalid={(e) => {
                    handleErrorMessagesTeamMembers(
                      e.currentTarget,
                      accountText.registerFields.agreement.errorMessage,
                      setErrors,
                      index
                    );
                    e.preventDefault();
                  }}
                  checked={values.teamMembers[index].agreement}
                  name={accountText.registerFields.agreement.name + index}
                  id={accountText.registerFields.agreement.id + index}
                  type="checkbox"
                  disabled={inputsDisabled}
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </form>
      <div className="account--bottom">

        <button
          className="account--button account--button__primary"
          onClick={hangleLogOut}
        >
          {accountText.buttons.logout}
        </button>
        <button
          type="button"
          className="account--button account--button__primary"
          onClick={() => navigate("/reset")}
        >
          {accountText.buttons.resetPassword}
        </button>
        {/* <button
          type="button"
          className="account--button account--button__primary"
          onClick={() => setShowAlert(true)}
        >
          {accountText.buttons.deleteTeam}
        </button> */}
        {
          showAlert &&
          <Alert
            title={accountText.alert.title}
            message={accountText.alert.message}
            buttonOneText={accountText.alert.buttons.delete}
            buttonOneAction={handleDeleteTeam}
            buttonTwoText={accountText.alert.buttons.cancel}
            buttonTwoAction={() => setShowAlert(false)}
          />
        }
      </div>
    </div>
  );
}

export default AccountPage;
