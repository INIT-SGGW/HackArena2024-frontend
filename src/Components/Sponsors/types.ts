export interface ComponentText {
    titles: {
        sponsors: string
        partners: string
        mediaPatronage: string,
        patronage: string
    }
}

export type Sponsor = {
    name: string;
    logo: string;
    url: string;
    height?: number;
}

export type SponsorData = {
    sponsors: Sponsor[];
    partners: Sponsor[];
    mediaPatronage: Sponsor[];
    patronage: Sponsor[];
}