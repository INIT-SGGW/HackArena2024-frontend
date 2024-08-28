export enum DateFormat {
    DATE,
    TIME,
    FULL
}

const dateFormat = (date: Date, format: DateFormat = DateFormat.FULL): string => {
    switch (format) {
        case DateFormat.DATE:
            return date.toLocaleDateString("pl-PL");
        case DateFormat.TIME:
            return date.toLocaleTimeString("pl-PL");
        case DateFormat.FULL:
            return date.toLocaleString("pl-PL");
    }
}

export default dateFormat;