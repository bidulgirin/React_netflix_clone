import React, { useState, useEffect } from "react";
import axios from "../api/axios.js";
import "./Row.css";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
    // console.log("request", request);

    return request;
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelection(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation // arrow 버튼 사용 유무
        //pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
      >
        <div id={id} className="row_posters">
          {movies.map((movie) => (
            <SwiperSlide>
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
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
// <section className="row">
//   <h2>{title}</h2>
//   <div className="slider">
//     <div
//       className="slider_arrow-left"
//       onClick={() => {
//         document.getElementById(id).scrollLeft -= window.innerWidth - 80;
//       }}
//     >
//       <span className="arrow">{"<"}</span>
//     </div>
//     <div id={id} className="row_posters">
//       {/*로드 되기 전에 요청하면 오류나서 이렇게 처리함*/}

//       {movies &&
//         movies.map((movie) => (
//           <img
//             key={movie.id}
//             style={{ padding: "25px 0" }}
//             className={`row_poster ${isLargeRow && "row_posterLarge"}`}
//             src={`https://image.tmdb.org/t/p/original/${
//               isLargeRow ? movie.poster_path : movie.backdrop_path
//             } `}
//             alt={movie.name}
//             onClick={() => handleClick(movie)}
//           />
//         ))}
//     </div>

//     <div
//       className="slider_arrow-right"
//       onClick={() => {
//         document.getElementById(id).scrollLeft += window.innerWidth - 80;
//       }}
//     >
//       <span className="arrow">{">"}</span>
//     </div>
//   </div>
//   {modalOpen && <Modal {...movieSelected} setModalOpen={setModalOpen} />}
// </section>
