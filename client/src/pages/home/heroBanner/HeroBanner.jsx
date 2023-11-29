import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./heroBanner.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const navigate = useNavigate();
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg);
  }, [data]);
  console.log(background);

  const searchQueryHandler = (event) => {
    if (query.length > 0 && event.key === "Enter") {
      navigate(`/search/${query}`);
      return;
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="background-img">
          <Img src={background} />
        </div>
      )}
      <div className="opaicty-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or a TV show..."
              onKeyUp={searchQueryHandler}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
