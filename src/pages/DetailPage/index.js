import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
export default function DetailPage() {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);
  if (!movie) return <div> ...이미지가 없습니다</div>;
  {
    {
      /* useParams 라는 hooks가 아무 css 파일에 있는 정보를 가져요네...?*/
    }
  }
  return (
    <section>
      <img
        className="modal_poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  );
}
