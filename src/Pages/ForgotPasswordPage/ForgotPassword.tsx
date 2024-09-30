import "./ForgotPassword.css";
import { FormEvent, useState } from "react";
import text from "../../Assets/text.json";
import AuthenticationService from "../../Services/AuthenticationService";
import { useNavigate } from "react-router";
import Alert from "../../Components/Alert/Alert";
import Page from "../../Components/Page/Page";
import { PageText } from "./types";
import Input from "../../Components/Input/Input";
import { ForgotPasswordRequestBody } from "../../Types/requests";

interface Props { }

type ForgotPasswordValues = {
    email: string;
    password: string;
    repeatPassword: string;
};

function ForgotPasswordPage(props: Props) {
    const pageText: PageText = text.forgotPassword;
    const [showErrors, setShowErrors] = useState<boolean>(false);
    const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const body: ForgotPasswordRequestBody = {
            email: data.get("email") as string
        }

        setInputsDisabled(true);
        AuthenticationService.forgotPassword(body).then((response) => {
            if (response.status === 201) {
                navigate("/sukces/forgot");
            } else {
                setSubmitError("Wystąpił błąd podczas resetowania hasła");
                setInputsDisabled(false);
            }
        }).catch(() => {
            setSubmitError("Wystąpił błąd podczas resetowania hasła");
            setInputsDisabled(false);
        });
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
                    <Input
                        pageText={pageText.formFields.email}
                        id="email"
                        name="email"
                        type="email"
                        showError={showErrors}
                        maxLength={70}
                        inputDisabled={inputsDisabled}
                        pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$"
                    />
                    <input type="submit" className="input__element input__button" onClick={() => setShowErrors(true)} disabled={inputsDisabled} value={inputsDisabled ? pageText.button.disabled : pageText.button.active} />
                </form>
            </div>
        </Page>
    );
}

export default ForgotPasswordPage;
