export interface Anime {
    id: number;
    siteUrl: string;
    popularity: number;
    bannerImage: null|string;
    title: {
        userPreferred: string;
    };
    coverImage: {
        extraLarge: string;
        large: string;
        medium: string;
        color: string;
    }
}