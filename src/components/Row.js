import React, { useState, useEffect } from "react";
import axios from "../api/axios.js";
import "./Row.css";
export default function Row({ title, fetchUrl, isLargeRow, id }) {
  const [movies, setMovies] = useState([]);
  //필요한 함수 가져오기
  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    console.log("request", request);
    return request;
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider_arrow-left">
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="row_posters">
          {movies && //로드 되기 전에 요청하면 오류나서 이렇게 처리함
            movies.map((movie) => (
              <img
                key={movie.id}
                style={{ padding: "25px 0" }}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                } `}
                alt={movie.name}
              />
            ))}
        </div>
        <div className="slider_arrow-right">
          <span className="arrow">{">"}</span>
        </div>
      </div>
    </section>
  );
}
