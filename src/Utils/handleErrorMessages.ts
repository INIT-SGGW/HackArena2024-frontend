import { InputErrors } from "../Types/types";

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

export { handleErrorMessages, handleErrorMessagesTeamMembers };