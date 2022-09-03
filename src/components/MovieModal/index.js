import React, { useState, useEffect, useRef } from "react";
import "./MovieModal.css";
import { useOnClickOutside } from "../../hooks/useOnClickOutside.js";
function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_data,
  first_air_date,
  vote_average,
  setModalOpen,
}) {
  const ref = useRef();
  //헷갈려서 handle이라는 변수를 따로 만들어줌
  const handle = () => {
    //이게 handler에 해당하는 함수임!
    setModalOpen(false);
  };
  useOnClickOutside(ref, handle);
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          {" "}
          {/* useRef() 감지할 요소 */}
          <span
            onClick={() => setModalOpen(false)} // 모달창 없애주는것
            className="modal-close"
          >
            X
          </span>
          <img
            className="modal_poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal_poster"
          />
          <div className="modal_content">
            <p className="modal_details">
              <span className="modal_user-perc">100% for you</span>{" "}
              {release_data ? release_data : first_air_date}
            </p>
            <h2 className="modal_title">{title ? title : name}</h2>
            <p className="modal_overview">평점: {vote_average}</p>
            <p className="modal_overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
