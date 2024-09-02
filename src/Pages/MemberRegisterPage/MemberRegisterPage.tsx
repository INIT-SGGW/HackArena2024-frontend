import React, { useEffect } from 'react'
import './MemberRegisterPage.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Page from '../../Components/Page/Page'
import Input from '../../Components/Input/Input'
import text from "../../Assets/text.json"
import { PageText } from './types'
import { eventStartDate, youngestParticipantAge } from '../../Constants/Dates'
import replacePlaceholders from '../../Utils/replacePlaceholders'
import Select from '../../Components/Select/Select'
import { DietPreference, Occupation, RegisterTeamMemberRequestBody } from '../../Types/requests'
import Alert from '../../Components/Alert/Alert'
import AuthenticationService from '../../Services/AuthenticationService'
import { ErrorBodyResponse } from '../../Types/responses'

function MemberRegisterPage() {
    const pageText: PageText = text.memberRegister

    const { teamName } = useParams<{ teamName: string }>()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [showErrors, setShowErrors] = React.useState<boolean>(false)
    const [inputsDisabled, setInputsDisabled] = React.useState<boolean>(false)
    const [agreementError, setAgreementError] = React.useState<boolean>(false)
    const [submitError, setSubmitError] = React.useState<string>("")


    const minDate = new Date(eventStartDate.getTime() - 1000 * 60 * 60 * 24 * 365 * youngestParticipantAge)

    const handleAgreementInvalid = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setAgreementError(true);
    }

    const handleChangeAgreement = (e: React.FormEvent<HTMLInputElement>): void => {
        if (showErrors && !e.currentTarget.checkValidity()) {
            setAgreementError(true);
        } else {
            setAgreementError(false);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const token = searchParams.get("token")
        const email = searchParams.get("email")

        if (!token || !email) {
            setSubmitError("Brak wymaganych parametrów w adresie URL");
            return;
        }

        const body: RegisterTeamMemberRequestBody = {
            firstName: data.firstName as string,
            lastName: data.lastName as string,
            password: data.password as string,
            dateOfBirth: data.dateOfBirth as string,
            occupation: data.occupation as Occupation,
            dietPreference: data.dietPreference as DietPreference,
            aggreement: data.agreement === "on",
            verificationToken: token,
            email: email
        }

        setInputsDisabled(true);

        AuthenticationService.registerTeamMember(body).then((response) => {
            if (response.status === 200) {
                navigate("/sukces/rejestracja/uczestnika")
            } else if (response.status === 400) {
                response.json().then((body: ErrorBodyResponse) => {
                    setSubmitError(body.message)
                    setInputsDisabled(false)
                });
            } else {
                setSubmitError("Wystąpił błąd")
                setInputsDisabled(false)
            }
        }).catch((error) => {
            setSubmitError("Wystąpił błąd")
            setInputsDisabled(false)
        })
    }

    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description} paddingTop noIndex>
            {submitError &&
                <Alert
                    title="Błąd"
                    message={submitError}
                    buttonOneText="Spróbuj ponownie"
                    buttonOneAction={() => { setSubmitError(""); }}
                />
            }
            <div className='memberRegister pagewidth'>
                <div className='section--column-1 register--heading'>
                    <h2 className='header header__yellow'>{pageText.title}</h2>
                    <h6>{replacePlaceholders(pageText.description, teamName || "")}</h6>
                </div>
                <form className='section--column-0' onSubmit={handleSubmit}>
                    <div className="section--row-1">
                        <Input pageText={pageText.form.firstName} id='first_name' name='firstName' showError={showErrors} minLength={1} maxLength={40} inputDisabled={inputsDisabled} pattern="^[A-Za-zÀ-ÖØ-öø-ÿąćółżźńęĄĆÓŁŻŹŃĘ' \-]+$" />
                        <Input pageText={pageText.form.lastName} id='last_name' name='lastName' showError={showErrors} minLength={1} maxLength={40} inputDisabled={inputsDisabled} pattern="^[A-Za-zÀ-ÖØ-öø-ÿąćółżźńęĄĆÓŁŻŹŃĘ' \-]+$" />
                    </div>
                    <div className="section--row-1">
                        <Input pageText={pageText.form.password} id="password" name="password" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$" />
                        <Input pageText={pageText.form.repeatPassword} id="repeat_password" name="repeatPassword" type="password" showError={showErrors} minLength={8} maxLength={100} inputDisabled={inputsDisabled} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$" />
                    </div>
                    <Input pageText={pageText.form.dateOfBirth} id='date_of_birth' name='dateOfBirth' type="date" maxNumber={minDate.toISOString().slice(0, 10)} showError={showErrors} inputDisabled={inputsDisabled} />
                    <div className="section--row-1">
                        <div className="section--column-0">
                            <label htmlFor="occupation">{pageText.form.occupation.label}</label>
                            <Select name='occupation' id='occupation' options={pageText.form.occupation.occupationOptions} inputDisabled={inputsDisabled} />
                        </div>
                        <div className="section--column-0">
                            <label htmlFor="diet_preference">{pageText.form.dietPreference.label}</label>
                            <Select name='dietPreference' id='diet_preference' options={pageText.form.dietPreference.dietPreferenceOptions} inputDisabled={inputsDisabled} />
                        </div>
                    </div>
                    <div className="form__checkbox--wrapper">
                        <input type="checkbox" name="agreement" id="agreement" onChange={handleChangeAgreement} onInvalid={handleAgreementInvalid} required disabled={inputsDisabled} className={agreementError ? 'input__checkbox--invalid' : ""} />
                        <label htmlFor='agreement' style={inputsDisabled ? { cursor: "default" } : { cursor: "pointer" }}>{pageText.form.agreement.label}</label>
                    </div>
                    <input type='submit' className='input__element input__button' onClick={() => setShowErrors(true)} disabled={inputsDisabled} value={inputsDisabled ? pageText.button.disabled : pageText.button.active} />
                </form>
            </div>
        </Page>
    )
}

export default MemberRegisterPage