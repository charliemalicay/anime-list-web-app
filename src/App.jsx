import * as React from "react";
import { Link } from "react-router-dom";

import { fetchAnimeList, getAnimeData } from "./services";
import "./styles.css";

export default function App() {
  // Declare API Respose Data Usestate
  const [animeList, setAnimeList] = React.useState([]);
  const [pagination, setPagination] = React.useState({});

  // Declara Store state for anime name
  const [animeName, setAnimeName] = React.useState("");
  const [currentAnimeID, setCurrentAnimeID] = React.useState(-1);

  // Store Data without initialize when rendering
  let animeDataList = React.useMemo(() => animeList, [animeList]);

  // Execute Anime APIs
  React.useEffect(() => {
    // Execute Search Anime Name API
    if (animeName.length > 0) {
      getAnimeData(animeName[0].toUpperCase()).then((response) => {
        if (response.data && response.data.length > 0) {
          setAnimeList(
            response.data.filter((data) => data.title.startsWith(animeName)),
          );
          setPagination(response.pagination);
        }
      });
      // Execute Load Anime list that sort by popularity
    } else {
      fetchAnimeList().then((response) => {
        setAnimeList(response.data);
        setPagination(response.pagination);
      });
    }
  }, [animeName]);

  return (
    <div className="App">
      <div className="searchbar">
        <h4>Search Anime:</h4>
        <input
          type="text"
          placeholder="Enter Anime Name"
          value={animeName}
          onChange={(value) => setAnimeName(value.target.value)}
        />
      </div>
      <h4>Anime List</h4>
      <div className="animeListPanel">
        {animeDataList &&
          animeDataList.length > 0 &&
          animeDataList.map((data, index) => {
            return (
              <Link
                to={`/anime/${data.mal_id}`}
                className="item"
                key={data.mal_id}
              >
                <img alt="anime-image" src={data.images.jpg.small_image_url} />
                {data.title}
              </Link>
            );
          })}
      </div>
    </div>
  );
}
