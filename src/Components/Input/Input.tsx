import React, { MouseEventHandler, useEffect } from 'react'
import './Input.css'
import { setErrorMessages } from '../../Utils/handleErrorMessages'
import { InputProps } from './types';
import addIcon from "../../Assets/add-circle.svg";


/**
 * Input component
 * @param pageText
 * @param id
 * @param name
 * @param inputDisabled - default false
 * @param requrired - default true
 * @param pattern - default ""
 * @param type - default "text"
 * @param spellCheck - default false
 * @param minLength - default undefined
 * @param maxLength - default undefined
 * @param maxNumber - default undefined
 * @param minNumber - default undefined
 */
function Input({
    pageText,
    id,
    name,
    showError,
    inputDisabled = false,
    requrired = true,
    pattern = undefined,
    type = "text",
    icon = undefined,
    onIconClick = undefined,
    spellCheck = false,
    minLength = undefined,
    maxLength = undefined,
    maxNumber = undefined,
    minNumber = undefined }: InputProps) {

    const [error, setError] = React.useState<string | null>(null);
    const [showLocalError, setShowLocalError] = React.useState<boolean>(showError);

    useEffect(() => {
        setShowLocalError(showError);
    }, [showError])

    useEffect(() => {
        document.getElementById(id)?.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && onIconClick) {
                e.preventDefault();
                handleOnClick();
            }
        })

        return () => {
            document.getElementById(id)?.removeEventListener("keydown", (e) => {
                if (e.key === "Enter" && onIconClick) {
                    e.preventDefault();
                    handleOnClick();
                }
            })
        }
    }, [])

    const handleOnClick = (): void => {
        const input = document.getElementById(id) as HTMLInputElement;

        if (!input.checkValidity()) {
            setErrorMessages(input, pageText.errorMessage, setError);
            setShowLocalError(true);
            return;
        }

        if (onIconClick) {
            onIconClick(input.value);
            setShowLocalError(false || showError);
            input.value = "";
        }
    }

    return (
        <div className="input">
            <label htmlFor={id} >
                {pageText.label}
            </label>
            <div className="input__wrapper input__wrapper--full-width">
                <input
                    className={`input__element input__field${(error && showLocalError) ? " input__element--error" : ""
                        }`}
                    id={id}
                    name={name}
                    placeholder={pageText.label}
                    type={type}
                    disabled={inputDisabled}
                    spellCheck={spellCheck}

                    required={requrired}
                    pattern={pattern}
                    minLength={minLength}
                    maxLength={maxLength}
                    max={maxNumber}
                    min={minNumber}

                    onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
                        setErrorMessages(e.currentTarget, pageText.errorMessage, setError);
                        e.preventDefault();
                    }}
                    onChange={(e) => setErrorMessages(e.target, pageText.errorMessage, setError)}
                />
                {icon && <img src={icon} alt="Dodaj" onClick={handleOnClick} className={`input__icon${inputDisabled ? " not-clickable" : ""}`} />}
            </div>
            <span className={`input__span${error && showLocalError ? " input__span--visible" : ""}`}>
                {error}
            </span>
        </div>
    )
}

export default Input