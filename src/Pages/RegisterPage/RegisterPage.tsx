import React, { useState } from "react";
import "./RegisterPage.css";
import text from "../../Assets/text.json";
import {
  handleErrorMessages,
  handleErrorMessagesTeamMembers,
} from "../../Utils/handleErrorMessages";
import { InputTeam, InputErrors } from "../../Types/types";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../Services/AuthenticationService";

interface Props { }

function RegisterPage(props: Props) {
  const navigate = useNavigate();
  const { register } = text;
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);


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
        repeatPassword: register.registerFields.repeatPassword.errorMessage,
      }));
      return;
    } else {
      setInputsDisabled(true);
      console.log(process.env.REACT_APP_API_URL);
      AuthenticationService.register(values)
        .then((response) => {
          if (response.status === 201) {
            const token = response.headers.get("Authorization");
            console.log(token);
            navigate("/rejestracja/sukces");
          } else {
            setInputsDisabled(false);
            alert("Coś poszło nie tak, spróbuj ponownie");
          }
        })
        .catch((error) => {
          setInputsDisabled(false);
          alert("Coś poszło nie tak, spróbuj ponownie");
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
    <div className="register">
      <div className="register--content pagewidth">
        <div className="register--heading">
          <h1 className="register--title">{register.title}</h1>
          <h5>{register.description}</h5>
        </div>
        <form className="register--form" onSubmit={handleSubmit}>
          {/* TEAM NAME */}
          <div className="register--input">
            <label
              htmlFor={register.registerFields.teamName.id}
              className="input--label"
            >
              {register.registerFields.teamName.label}
            </label>
            <input
              className={`input--input${errors.teamName && showErrors ? " input--input__error" : ""
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
                htmlFor={register.registerFields.password.id}
                className="input--label"
              >
                {register.registerFields.password.label}
              </label>
              <input
                className={`input--input${errors.password && showErrors ? " input--input__error" : ""
                  }`}
                placeholder={register.registerFields.password.label}
                name={register.registerFields.password.name}
                id={register.registerFields.password.id}
                type="password"
                disabled={inputsDisabled}
                pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
                onInvalid={(e) => {
                  handleErrorMessages<InputErrors>(
                    e.currentTarget,
                    register.registerFields.password.errorMessage,
                    setErrors
                  );
                  e.preventDefault();
                }}
                value={values.password}
                onChange={(e) => {
                  setValues({ ...values, password: e.currentTarget.value });
                  handleErrorMessages<InputErrors>(
                    e.currentTarget,
                    register.registerFields.password.errorMessage,
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
                htmlFor={register.registerFields.repeatPassword.id}
                className="input--label"
              >
                {register.registerFields.repeatPassword.label}
              </label>
              <input
                className={`input--input${errors.repeatPassword && showErrors
                  ? " input--input__error"
                  : ""
                  }`}
                placeholder={register.registerFields.repeatPassword.label}
                name={register.registerFields.repeatPassword.name}
                id={register.registerFields.repeatPassword.id}
                type="password"
                disabled={inputsDisabled}
                pattern=".*"
                onInvalid={(e) => {
                  handleErrorMessages<InputErrors>(
                    e.currentTarget,
                    register.registerFields.repeatPassword.errorMessage,
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
                    register.registerFields.repeatPassword.errorMessage,
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
            <h4>{register.teamMembers}</h4>
            {values.teamMembers.map((_, index) => (
              <div key={index} className="register--innerform">
                <h5>
                  {register.teamMember} {index + 1}
                </h5>
                <div className="register--column">
                  {/* FIRST NAME */}
                  <div className="register--input">
                    <label
                      htmlFor={register.registerFields.firstName.id + index}
                      className="input--label"
                    >
                      {register.registerFields.firstName.label}
                    </label>
                    <input
                      className={`input--input${errors.teamMembers[index].firstName && showErrors
                        ? " input--input__error"
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
                      className={`input--span${showErrors ? " input--span__visible" : ""
                        }`}
                    >
                      {errors.teamMembers[index].firstName}
                    </span>
                  </div>
                  {/* LAST NAME */}
                  <div className="register--input">
                    <label
                      htmlFor={register.registerFields.lastName.id + index}
                      className="input--label"
                    >
                      {register.registerFields.lastName.label}
                    </label>
                    <input
                      className={`input--input${errors.teamMembers[index].lastName && showErrors
                        ? " input--input__error"
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
                    htmlFor={register.registerFields.email.id + index}
                    className="input--label"
                  >
                    {register.registerFields.email.label}
                  </label>
                  <input
                    className={`input--input${errors.teamMembers[index].email && showErrors
                      ? " input--input__error"
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
                      } as InputTeam);
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
                      htmlFor={register.registerFields.dateOfBirth.id + index}
                      className="input--label"
                    >
                      {register.registerFields.dateOfBirth.label}
                    </label>
                    <input
                      className={`input--input${errors.teamMembers[index].dateOfBirth && showErrors
                        ? " input--input__error"
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
                        });
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
                      className={`input--span${showErrors ? " input--span__visible" : ""
                        }`}
                    >
                      {errors.teamMembers[index].dateOfBirth}
                    </span>
                  </div>
                  {/* OCCUPATION */}
                  <div className="register--input">
                    <label
                      htmlFor={register.registerFields.occupation.id + index}
                    >
                      {register.registerFields.occupation.label}
                    </label>
                    <select
                      name="occupation"
                      className="input--select input--input"
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
                        });
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
                    htmlFor={register.registerFields.vegan.id + index}
                    className="input--label"
                  >
                    {register.registerFields.vegan.label}
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
                    className={`input--checkbox${showErrors && errors.teamMembers[index].agreement
                      ? " input--checkbox__error"
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
                      });
                    }}
                    onInvalid={(e) => {
                      handleErrorMessagesTeamMembers(
                        e.currentTarget,
                        register.registerFields.agreement.errorMessage,
                        setErrors,
                        index
                      );
                      e.preventDefault();
                    }}
                    name={register.registerFields.agreement.name + index}
                    id={register.registerFields.agreement.id + index}
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
              inputsDisabled ? register.button.disabled : register.button.active
            }
            onClick={handleTrySubmit}
            disabled={inputsDisabled}
          />
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
