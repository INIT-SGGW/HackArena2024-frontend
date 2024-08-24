export interface PageText {
    title: string;
    upcoming: string;
    finished: string;
    noEvents: string;
}

export interface EventBannerData {
    title: string;
    date: string;
    banner: string;
    url: string;
}

export interface EventsData {
    count: number;
    upcoming: EventBannerData[];
    finished: EventBannerData[];
}