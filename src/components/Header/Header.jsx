import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import User from "../../images/logo3.png";
import Logo from "../../images/Logo.svg";

import "./Header.scss";

const Header = () => {
  const [term, setTerm] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter search term!");
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };

  return (
    <div className="header">
      <div className="logo">
        {/* <Link> */} <img src={Logo} alt="Logo" /> {/* </Link> */}
        {/* <Link to="/">Movie App </Link> */}
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>{" "}
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={Logo} alt="user" />
      </div>
    </div>
  );
};

export default Header;
