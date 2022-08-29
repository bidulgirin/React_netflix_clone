import React, { useEffect, useState } from "react";
import "./Nav.css";
export default function Nav() {
  const [show, setShow] = useState(false);

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
  return (
    <nav className={`nav ${show && "nav_black"}`}>
      {/*show가 true일때 nav_black 클래스를 붙여준다*/}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
        className="nav_logo"
        onClick={() => window.location.reload()}
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="User logged"
        className="nav_avatar"
      />
    </nav>
  );
}
