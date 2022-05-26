import axios from "axios";
import { Anime } from "../types/anilist";

const statsQuery = `
query {
    SiteStatistics {
        anime { nodes { count } }
    }
}`;

const animeQuery = `
query($page:Int, $type:MediaType) { 
    Page(page:$page) {
        pageInfo { total }
        media(type:$type) { id, siteUrl, popularity, bannerImage, coverImage { extraLarge, large, medium, color }, title { userPreferred } }
    }
}`;

function body(query: string, variables: {[key: string]: number|string}) {
    return {
        query,
        variables
    }
}

export async function fetchRandomAnime(): Promise<Anime|null> {
    try {
        const stats = (await axios.post("https://graphql.anilist.co", body(statsQuery, {}))).data.data;
        const nodes = stats.SiteStatistics.anime.nodes;
        const selectedAnime = Math.floor(Math.random() * nodes[nodes.length - 1].count);

        const anime = (await axios.post("https://graphql.anilist.co", body(animeQuery, {page: Math.floor(selectedAnime/50), type: "ANIME"}))).data.data;
        return anime.Page.media[selectedAnime % 50];
    } catch (e) {
       return null;
    }
}