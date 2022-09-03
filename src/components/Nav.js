import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//css
import "./Nav.css";
//nav start
export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };
  //useEffect
  // 스크롤 하면 스타일이 바뀌는 nav
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  //render
  return (
    <nav className={`nav ${show && "nav_black"}`}>
      {/*show가 true일때 nav_black 클래스를 붙여준다*/}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
        className="nav_logo"
        onClick={() => (window.location.href = "/")}
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav_input"
        type="text"
        placeholder="영화검색"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="User logged"
        className="nav_avatar"
      />
    </nav>
  );
}
