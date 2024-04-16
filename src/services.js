import axios from "axios";

const animeListURL =
  "https://api.jikan.moe/v4/anime?order_by=popularity&q=https://api.jikan.moe/v4/anime/{id}/full";

const animeSearchURL = "https://api.jikan.moe/v4/anime?letter=";

const animeDataID = "https://api.jikan.moe/v4/anime/";

const fetchAnimeList = async () => {
  const response = axios.get(animeListURL);

  return response
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return "Error Fetching Anime List";
    });
};

const getAnimeData = async (letter) => {
  const response = axios.get(`${animeSearchURL}${letter}`);

  return response
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return "Error Fetching Searched Anime Data";
    });
};

const getAnimeInfoData = async (animeID) => {
  const response = axios.get(`${animeDataID}${animeID}`);

  return response
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return "Error Fetching Anime Info Data";
    });
};

export { fetchAnimeList, getAnimeData, getAnimeInfoData };
