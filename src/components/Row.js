import React, { useState, useEffect } from "react";
import Modal from "./MovieModal/index";
import axios from "../api/axios.js";
import "./Row.css";

export default function Row({
  title,
  fetchUrl,
  isLargeRow,
  id,
  MovieModal,
  baseURL,
}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});
  //필요한 함수 가져오기
  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    //console.log("request", request);

    return request;
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelection(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div
          className="slider_arrow-left"
          onClick={() => {
            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="row_posters">
          {/*로드 되기 전에 요청하면 오류나서 이렇게 처리함*/}

          {movies &&
            movies.map((movie) => (
              <img
                key={movie.id}
                style={{ padding: "25px 0" }}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                } `}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            ))}
        </div>

        <div
          className="slider_arrow-right"
          onClick={() => {
            document.getElementById(id).scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow">{">"}</span>
        </div>
      </div>
      {modalOpen && <Modal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}
