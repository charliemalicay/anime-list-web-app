import * as React from "react";
import { Link, useParams } from "react-router-dom";

import { Icon } from "@iconify/react";

import { getAnimeInfoData } from "./services";

const AnimePage = () => {
  const { animeID } = useParams();

  const [animeData, setAnimeData] = React.useState({});

  const cacheData = React.useMemo(() => animeData, [animeData]);

  React.useEffect(() => {
    getAnimeInfoData(animeID).then((response) => {
      setAnimeData(response.data);
    });
  }, [animeID]);

  React.useEffect(() => {
    console.log("cacheData:", cacheData);
    // console.log("cacheData.images:", cacheData.images.jpg.large_image_url);
  }, [cacheData]);

  return (
    <div className="animePage">
      <h1>Anime Page</h1>
      <Link to="/">
        <Icon
          icon="lets-icons:back"
          width="25"
          height="25"
          style={{ color: "black" }}
        />
        <span>Anime List</span>
      </Link>
      <div className="poster">
        <h3>{cacheData.title}</h3>
        <div className="column">
          <div className="left-panel">
            {cacheData.images && cacheData.images.jpg && (
              <img
                alt="anime-poster"
                src={cacheData.images.jpg.large_image_url}
              />
            )}
          </div>
          <div className="right-panel">
            <p>
              <span>English Title:</span> {cacheData.title_english}
            </p>
            <p>
              <span>Japannese Title:</span> {cacheData.title_japanese}
            </p>
            <div className="genre">
              <p>
                <span>Genre:</span>
              </p>
              {cacheData.genres &&
                cacheData.genres.map((data, index) => {
                  return <p key={index}>{data.name}</p>;
                })}
            </div>
            <p>
              <span>Popularity:</span> {cacheData.popularity}
            </p>
            <p>
              <span>Rating:</span> {cacheData.rating}
            </p>
            <p>
              <span>Scrore:</span> {cacheData.score}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
