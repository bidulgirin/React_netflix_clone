import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";
export default function SearchPage() {
  const navigate = useNavigate();
  // 검색 후에도 다른 검색어를 입력할 수 있게 하기 위함
  const [searchResults, setSearchResults] = useState([]);

  //   console.log("useLocation()", useLocation());
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  //console.log("searchTerm", searchTerm);

  //try catch -> try에서 만든 코드가 에러가 났을때 catch 로 처리하는 문법
  const fetchSearchMovie = async (debouncedSearchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
      );
      console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div
                onClick={() => {
                  navigate(`/${movie.id}`);
                }}
                className="movie"
                key={movie.id}
              >
                <div className="movie_column-poster">
                  <img
                    src={movieImageUrl}
                    alt="movie image"
                    className="movie_poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results_text">
          <p>
            찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다
          </p>
        </div>
      </section>
    );
  };
  //render
  return renderSearchResults();
}
