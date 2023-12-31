import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN
}

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios(BASE_URL + url, {
            headers: headers
        });

        return data;
    } catch (error) {
        console.log("API", error);
        return error;
    }


}
