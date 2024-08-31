import text from "../Assets/text.json";
import replacePlaceholders from "./replacePlaceholders";


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
    } else if (validityState.patternMismatch) {
        errorMessage = mismatchError;
    } else {
        errorMessage = errorMessages.default
    }

    setError(errorMessage);
};

export { setErrorMessages };