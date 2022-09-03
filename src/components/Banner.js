import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./Banner.css";
import axios from "../api/axios";
import requests from "../api/request";
function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  //브라우저 api를 이용하여 문서 타이틀을 업데이트한다
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 정보를 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    //여러 영화 중 하나의 ID 가져오기

    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    //특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };
  //substr() 이라는 메소드를 이용하여 잘라줌
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${
            movie.backdrop_path
              ? movie.backdrop_path
              : "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg"
          }")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie.original_name}
          </h1>
          <div className="banner_buttons">
            <button
              className="banner_button play"
              onClick={() => {
                setIsClicked(true);
              }}
            >
              ▶Play
            </button>
            <button className="banner_button info">
              <div className="space">More Information</div>
            </button>
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    );
  } else {
    return (
      <div>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width="640"
              height="360"
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfulllscreen
            ></Iframe>
          </HomeContainer>
        </Container>
      </div>
    );
  }
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-direction: column;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
  }
`;
export default Banner;
