export enum DateFormat {
    DATE,
    TIME,
    FULL
}

const dateFormat = (date: Date, format: DateFormat = DateFormat.FULL): string => {
    switch (format) {
        case DateFormat.DATE:
            console.log("date")
            return date.toLocaleDateString("pl-PL");
        case DateFormat.TIME:
            console.log("time")

            return date.toLocaleTimeString("pl-PL");
        case DateFormat.FULL:
            console.log("full")

            return date.toLocaleString("pl-PL");
    }
}

export default dateFormat;