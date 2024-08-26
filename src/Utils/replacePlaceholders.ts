function replacePlaceholders(message: string, value: string): string;
function replacePlaceholders(message: string, value: string[]): string;

function replacePlaceholders(message: string, value: string | string[]): string {
    if (Array.isArray(value)) {
        value.forEach((val, index) => {
            message = message.replace(`{${index}}`, val);
        });
    } else {
        message = message.replace("{0}", value);
    }

    return message;
}

export default replacePlaceholders;