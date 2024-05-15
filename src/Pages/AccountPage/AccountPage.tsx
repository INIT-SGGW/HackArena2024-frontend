import "./AccountPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { AccountTeam, InputErrors } from "../../Types/types";
import React, { useState } from "react";
import text from "../../Assets/text.json";
import {
  handleErrorMessages,
  handleErrorMessagesTeamMembers,
} from "../../Utils/handleErrorMessages";
import { eventEndDate, eventStartDate } from "../../Constants/Constants";
import isEventLive from "../../Utils/isEventLive";
import FileUploader from "../../Components/FileUploader/FileUploader";

interface Props {}

const teamData: AccountTeam = {
  _id: "1",
  teamName: "Big cocks",
  teamMembers: [
    {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gamil.com",
      dateOfBirth: "2000-01-01",
      occupation: "Student",
      isVegan: true,
      agreement: true,
    },
    {
      _id: "2",
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@gmail.com",
      dateOfBirth: "2000-01-02",
      occupation: "Uczeń",
      isVegan: false,
      agreement: true,
    },
  ],
};

function AccountPage(props: Props) {
  const register = text.register;
  const { zespolID } = useParams<{ zespolID: string }>();
  const navigate = useNavigate();

  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);

  const [values, setValues] = useState<AccountTeam>(teamData);
  const [valuesBackup, setValuesBackup] = useState<AccountTeam>(teamData);
  const [errors, setErrors] = useState<InputErrors>({
    teamName: "",
    password: "",
    repeatPassword: "",
    teamMembers: teamData.teamMembers.map((member) => ({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      occupation: "",
      agreement: "",
    })),
  });

  const handleTrySubmit = () => {
    setShowErrors(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log(values);
    setInputsDisabled(true);
  };

  const handleAddTeamMember = () => {
    setValues({
      ...values,
      teamMembers: [
        ...values.teamMembers,
        {
          _id: "",
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
      console.log("edit");
      setValuesBackup({ ...values, teamMembers: [...values.teamMembers] });
    } else {
      console.log("cancel");
      setValues({
        ...valuesBackup,
        teamMembers: [...valuesBackup.teamMembers],
      });
      setErrors({
        teamName: "",
        password: "",
        repeatPassword: "",
        teamMembers: teamData.teamMembers.map((member) => ({
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

  return (
    <div className="account pagewidth">
      <form className="register--form" onSubmit={handleSubmit}>
        {/* TEAM NAME */}
        <div className="account--header">
          <div className="register--input">
            <input
              className={`account--input account--input__header${
                errors.teamName && showErrors ? " account--input__error" : ""
              }`}
              placeholder={register.registerFields.teamName.label}
              name={register.registerFields.teamName.name}
              id={register.registerFields.teamName.id}
              type="text"
              disabled={inputsDisabled}
              pattern=".*"
              onInvalid={(e) => {
                handleErrorMessages<InputErrors>(
                  e.currentTarget,
                  register.registerFields.teamName.errorMessage,
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
                  register.registerFields.teamName.errorMessage,
                  setErrors
                );
              }}
              required
              minLength={2}
              maxLength={40}
            />
            <span
              className={`input--span${
                showErrors ? " input--span__visible" : ""
              }`}
            >
              {errors.teamName}
            </span>
          </div>
          <div className="header--buttons">
            {!inputsDisabled && (
              <input
                className={`account--button account--button__primary${
                  inputsDisabled ? "" : " account--button__halfborder"
                }`}
                type="submit"
                value={inputsDisabled ? register.button.disabled : "Zapisz"}
                onClick={handleTrySubmit}
                disabled={inputsDisabled}
              />
            )}
            {!isEventLive(eventStartDate, eventEndDate) && (
              <input
                type="button"
                className={`account--button account--button__primary${
                  inputsDisabled ? "" : " account--button__halfborder"
                }`}
                onClick={handleEditForm}
                value={inputsDisabled ? "Edit" : "Cancel"}
              ></input>
            )}
          </div>
        </div>
        <FileUploader />

        <div className="register--addfriend">
          {/* ADD FRIEND */}
          <div className="register--memberbuttons">
            <h4>{register.teamMembers}</h4>

            {!inputsDisabled && (
              <input
                className="account--button account--button__primary"
                type="button"
                disabled={inputsDisabled || values.teamMembers.length >= 3}
                value="Dodaj"
                onClick={handleAddTeamMember}
              />
            )}
          </div>
          {values.teamMembers.map((_, index) => (
            <div key={index} className="register--innerform">
              <div className="register--memberbuttons">
                <h5>
                  {register.teamMember} {index + 1}
                </h5>

                {!inputsDisabled && values.teamMembers.length > 1 && (
                  <input
                    className="account--button account--button__secondary"
                    type="button"
                    value="Usuń"
                    onClick={() => handleDeleteTeamMember(index)}
                  />
                )}
              </div>
              <div className="register--column">
                {/* FIRST NAME */}
                <div className="register--input">
                  <input
                    className={`account--input${
                      errors.teamMembers[index].firstName && showErrors
                        ? " account--input__error"
                        : ""
                    }`}
                    placeholder={register.registerFields.firstName.label}
                    name={register.registerFields.firstName.name + index}
                    id={register.registerFields.firstName.id + index}
                    type="text"
                    disabled={inputsDisabled}
                    pattern="^[a-zA-Z .]*$"
                    onInvalid={(e) => {
                      handleErrorMessagesTeamMembers(
                        e.currentTarget,
                        register.registerFields.firstName.errorMessage,
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
                        register.registerFields.firstName.errorMessage,
                        setErrors,
                        index
                      );
                    }}
                    required
                    minLength={2}
                    maxLength={50}
                  />
                  <span
                    className={`input--span${
                      showErrors ? " input--span__visible" : ""
                    }`}
                  >
                    {errors.teamMembers[index].firstName}
                  </span>
                </div>
                {/* LAST NAME */}
                <div className="register--input">
                  <input
                    className={`account--input${
                      errors.teamMembers[index].lastName && showErrors
                        ? " account--input__error"
                        : ""
                    }`}
                    placeholder={register.registerFields.lastName.label}
                    name={register.registerFields.lastName.name + index}
                    id={register.registerFields.lastName.id + index}
                    type="text"
                    disabled={inputsDisabled}
                    pattern="^[a-zA-Z .]*$"
                    onInvalid={(e) => {
                      handleErrorMessagesTeamMembers(
                        e.currentTarget,
                        register.registerFields.lastName.errorMessage,
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
                        register.registerFields.lastName.errorMessage,
                        setErrors,
                        index
                      );
                    }}
                    required
                    minLength={2}
                    maxLength={50}
                  />
                  <span
                    className={`input--span${
                      showErrors ? " input--span__visible" : ""
                    }`}
                  >
                    {errors.teamMembers[index].lastName}
                  </span>
                </div>
              </div>
              {/* EMAIL */}
              <div className="register--input">
                <input
                  className={`account--input${
                    errors.teamMembers[index].email && showErrors
                      ? " account--input__error"
                      : ""
                  }`}
                  placeholder={register.registerFields.email.label}
                  name={register.registerFields.email.name + index}
                  id={register.registerFields.email.id + index}
                  type="email"
                  disabled={inputsDisabled}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  onInvalid={(e) => {
                    handleErrorMessagesTeamMembers(
                      e.currentTarget,
                      register.registerFields.email.errorMessage,
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
                      register.registerFields.email.errorMessage,
                      setErrors,
                      index
                    );
                  }}
                  required
                  maxLength={60}
                />
                <span
                  className={`input--span${
                    showErrors ? " input--span__visible" : ""
                  }`}
                >
                  {errors.teamMembers[index].email}
                </span>
              </div>
              <div className="register--column">
                {/* DATE OF BIRTH */}
                <div className="register--input">
                  <input
                    className={`account--input${
                      errors.teamMembers[index].dateOfBirth && showErrors
                        ? " account--input__error"
                        : ""
                    }`}
                    placeholder={register.registerFields.dateOfBirth.label}
                    name={register.registerFields.dateOfBirth.name + index}
                    id={register.registerFields.dateOfBirth.id + index}
                    type="date"
                    disabled={inputsDisabled}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    onInvalid={(e) => {
                      handleErrorMessagesTeamMembers(
                        e.currentTarget,
                        register.registerFields.dateOfBirth.errorMessage,
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
                        register.registerFields.dateOfBirth.errorMessage,
                        setErrors,
                        index
                      );
                    }}
                    required
                    max="2017-01-01"
                  />
                  <span
                    className={`input--span${
                      showErrors ? " input--span__visible" : ""
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
                    id={register.registerFields.occupation.id + index}
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
                    {register.registerFields.occupation.occupationChoices.map(
                      (option, index) => (
                        <option value={option} key={index}>
                          {option}
                        </option>
                      )
                    )}
                  </select>
                  <span
                    className={`input--span${
                      showErrors ? " input--span__visible" : ""
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
                  htmlFor={register.registerFields.vegan.id + index}
                  className="input--label"
                >
                  {register.registerFields.vegan.label}
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
                  name={register.registerFields.vegan.name + index}
                  id={register.registerFields.vegan.id + index}
                  type="checkbox"
                  disabled={inputsDisabled}
                />
              </div>
              {/* AGREEMENT */}
              <div className="register--checkbox">
                <label
                  htmlFor={register.registerFields.agreement.id + index}
                  className="input--label"
                >
                  {register.registerFields.agreement.label}
                </label>
                <input
                  className={`account--checkbox${
                    showErrors && errors.teamMembers[index].agreement
                      ? " account--checkbox__error"
                      : ""
                  }
                  `}
                  onChange={(e) => {
                    handleErrorMessagesTeamMembers(
                      e.currentTarget,
                      register.registerFields.agreement.errorMessage,
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
                      register.registerFields.agreement.errorMessage,
                      setErrors,
                      index
                    );
                    e.preventDefault();
                  }}
                  checked={values.teamMembers[index].agreement}
                  name={register.registerFields.agreement.name + index}
                  id={register.registerFields.agreement.id + index}
                  type="checkbox"
                  disabled={inputsDisabled}
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </form>
      <button
        className="account--button account--button__primary"
        onClick={() => {
          localStorage.removeItem("teamID");
          navigate("/");
        }}
      >
        Logout
      </button>
      <button
        type="button"
        className="account--button account--button__primary"
        onClick={() => navigate("/reset")}
      >
        Zresetuj hasło
      </button>
    </div>
  );
}

export default AccountPage;
