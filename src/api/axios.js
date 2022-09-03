import axios from "axios";
// 코드 반복을 줄이기위해 instance를 만든다
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/", //반복될 url
  params: {
    api_key: process.env.REACT_APP_MOVIE_DB_API,
    language: "ko-KR",
  },
});

export default instance;
