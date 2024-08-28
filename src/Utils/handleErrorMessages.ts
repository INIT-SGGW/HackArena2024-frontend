import { InputErrors } from "../Types/types";
import text from "../Assets/text.json";
import replacePlaceholders from "./replacePlaceholders";

const handleErrorMessages = <T,>(
    input: HTMLInputElement,
    mismatchError: string,
    setErrors: React.Dispatch<React.SetStateAction<T>>,
) => {
    const validityState = input.validity;
    let errorMessage = "";

    if (validityState.valueMissing) {
        errorMessage = "To pole jest wymagane.";
    } else if (validityState.rangeUnderflow) {
        errorMessage = `Minimalna wartość to ${input.min}.`;
    } else if (validityState.rangeOverflow) {
        errorMessage = `Maksymalna wartość to ${input.max}.`;
    } else if (validityState.tooShort) {
        errorMessage = `Minimalna długość to ${input.minLength} znaków.`;
    } else if (validityState.tooLong) {
        errorMessage = `Maksymalna długość to ${input.maxLength} znaków.`;

    } else if (input.type === "checkbox" && !input.checked) {
        errorMessage = "Musisz zaakceptować regulamin.";
    } else if (validityState.patternMismatch) {
        errorMessage = mismatchError;
    }

    setErrors((prev: T) => ({ ...prev, [input.name]: errorMessage }));
};


const handleErrorMessagesTeamMembers = (
    input: HTMLInputElement,
    mismatchError: string,
    setErrors: React.Dispatch<React.SetStateAction<InputErrors>>,
    id: number
) => {
    const validityState = input.validity;
    let errorMessage = "";

    if (validityState.valueMissing) {
        errorMessage = "To pole jest wymagane.";
    } else if (validityState.rangeUnderflow) {
        errorMessage = `Minimalna wartość to ${input.min}.`;
    } else if (validityState.rangeOverflow) {
        errorMessage = `Maksymalna wartość to ${input.max}.`;
    } else if (validityState.tooShort) {
        errorMessage = `Minimalna długość to ${input.minLength} znaków.`;
    } else if (validityState.tooLong) {
        errorMessage = `Maksymalna długość to ${input.maxLength} znaków.`;
    } else if (input.name === "repeatPassword") {
        const password = document.getElementById("password") as HTMLInputElement;
        if (password.value !== input.value) {
            errorMessage = mismatchError;
        }
    } else if (input.type === "checkbox" && !input.checked) {
        errorMessage = "Musisz zaakceptować regulamin.";
    } else if (validityState.patternMismatch) {
        errorMessage = mismatchError;
    }

    setErrors((prev) => ({
        ...prev,
        teamMembers: [
            ...prev.teamMembers.slice(0, id),
            {
                ...prev.teamMembers[id],
                [input.name.slice(0, input.name.length - 1)]: errorMessage,
            },
            ...prev.teamMembers.slice(id + 1),
        ],
    }));

};

interface ErrorMessages {
    valueMissing: string
    rangeUnderflow: string
    rangeOverflow: string
    tooShort: string
    tooLong: string
    checkbox: string
    email: string
    default: string
}

const setErrorMessages = (
    input: HTMLInputElement,
    mismatchError: string,
    setError: React.Dispatch<string>,
) => {
    const errorMessages = text.inputErrorMessages;
    const validityState = input.validity;
    let errorMessage = "";

    if (validityState.valid) {
        setError("");
        return;
    } else if (validityState.valueMissing) {
        errorMessage = errorMessages.valueMissing;
    } else if (validityState.rangeUnderflow) {
        if (input.type === "date") {
            errorMessage = replacePlaceholders(errorMessages.dateRangeUnderflow, input.min);
        } else {
            errorMessage = replacePlaceholders(errorMessages.rangeUnderflow, input.min);
        }
    } else if (validityState.rangeOverflow) {
        if (input.type === "date") {
            errorMessage = replacePlaceholders(errorMessages.dateRangeOverflow, input.max);
        } else {
            errorMessage = replacePlaceholders(errorMessages.rangeOverflow, input.max);
        }
    } else if (validityState.tooShort) {
        errorMessage = replacePlaceholders(errorMessages.tooShort, input.minLength.toString());
    } else if (validityState.tooLong) {
        errorMessage = replacePlaceholders(errorMessages.tooLong, input.maxLength.toString());
    } else if (input.type === "checkbox" && !input.checked) {
        errorMessage = errorMessages.checkbox;
    } else if (validityState.typeMismatch && input.type === "email") {
        errorMessage = errorMessages.email;
    } else if (validityState.patternMismatch) {
        errorMessage = mismatchError;
    } else {
        errorMessage = errorMessages.default
    }

    setError(errorMessage);
};

export { handleErrorMessages, handleErrorMessagesTeamMembers, setErrorMessages };