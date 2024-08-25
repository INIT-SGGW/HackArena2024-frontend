import "./ForgotPassword.css";
import { FormEvent, useState } from "react";
import { handleErrorMessages } from "../../Utils/handleErrorMessages";
import text from "../../Assets/text.json";
import AuthenticationService from "../../Services/AuthenticationService";
import { useNavigate } from "react-router";
import Alert from "../../Components/Alert/Alert";
import Page from "../../Components/Page/Page";
import { PageText } from "./types";

interface Props { }

type ForgotPasswordValues = {
    email: string;
    password: string;
    repeatPassword: string;
};

function ForgotPassword(props: Props) {
    const pageText: PageText = text.forgotPassword;
    const [showErrors, setShowErrors] = useState<boolean>(false);
    const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
    const [errors, setErrors] = useState<ForgotPasswordValues>({
        email: "",
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
        const data: ForgotPasswordValues = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            repeatPassword: formData.get(
                pageText.formFields.repeatPassword.name
            ) as string,
        };

        if (data.password !== data.repeatPassword) {
            setErrors((prev) => ({
                ...prev,
                repeatPassword:
                    pageText.formFields.repeatPassword.errorMessage,
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
                <h2>{pageText.title}</h2>
                <form onSubmit={handleSubmit} className="login--form">
                    <div className="login--input">
                        {/* <label className="input--label" htmlFor="email">
            Email:
          </label> */}
                        <input
                            onInvalid={(e) => {
                                e.preventDefault();
                                handleErrorMessages<ForgotPasswordValues>(
                                    e.currentTarget,
                                    pageText.formFields.email.errorMessage,
                                    setErrors
                                );
                            }}
                            onChange={(e) => {
                                handleErrorMessages<ForgotPasswordValues>(
                                    e.currentTarget,
                                    pageText.formFields.email.errorMessage,
                                    setErrors
                                );
                            }}
                            disabled={inputsDisabled}
                            spellCheck={false}
                            type="email"
                            id={pageText.formFields.email.id}
                            name={pageText.formFields.email.name}
                            placeholder={pageText.formFields.email.label}
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
                        {/* <label className="input--label" htmlFor="password">
            Hasło:
          </label> */}
                        <input
                            onInvalid={(e) => {
                                e.preventDefault();

                                handleErrorMessages<ForgotPasswordValues>(
                                    e.currentTarget,
                                    pageText.formFields.password.errorMessage,
                                    setErrors
                                );
                            }}
                            onChange={(e) => {
                                handleErrorMessages<ForgotPasswordValues>(
                                    e.currentTarget,
                                    pageText.formFields.password.errorMessage,
                                    setErrors
                                );
                            }}
                            disabled={inputsDisabled}
                            type="password"
                            id={pageText.formFields.password.id}
                            placeholder={pageText.formFields.password.label}
                            name={pageText.formFields.password.name}
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

                                handleErrorMessages<ForgotPasswordValues>(
                                    e.currentTarget,
                                    pageText.formFields.repeatPassword.errorMessage,
                                    setErrors
                                );
                            }}
                            onChange={(e) => {
                                handleErrorMessages<ForgotPasswordValues>(
                                    e.currentTarget,
                                    pageText.formFields.repeatPassword.errorMessage,
                                    setErrors
                                );
                            }}
                            disabled={inputsDisabled}
                            type="password"
                            id={pageText.formFields.repeatPassword.id}
                            placeholder={pageText.formFields.repeatPassword.label}
                            name={pageText.formFields.repeatPassword.name}
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
                                ? pageText.button.disabled
                                : pageText.button.active
                        }
                        disabled={inputsDisabled}
                        onClick={handleTrySubmit}
                    />
                </form>
            </div>
        </Page>
    );
}

export default ForgotPassword;
