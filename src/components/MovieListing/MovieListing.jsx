import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import { ReactComponent as Rectangle } from "../../images/Rectangle 5.svg";
import Ipad from "../../images/iPad.svg";
import IphoneRectangle from "../../images/iPhoneRec.svg";

import "./MovieListing.scss";

const MovieListing = () => {
  const [term, setTerm] = useState("");
  const [width, setWidth] = useState(0);

  const carousel = useRef();

  const setNewWidth = useCallback(() => {
    console.log(carousel.current?.scrollWidth);
    setWidth(carousel.current?.scrollWidth || 0);
  }, [carousel]);

  useEffect(() => {
    window.addEventListener("resize", setNewWidth);
    return () => {
      window.removeEventListener("resize", setNewWidth);
    };
  }, [carousel]);

  const dispatch = useDispatch();

  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter search term!");
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };

  return (
    <>
      <div className="movie-wrapper">
        <div className="top-image">
          <Rectangle className="rectangle" />
          <img src={Ipad} alt="Ipad" className="ipad" />
          <img src={IphoneRectangle} alt="Iphone" className="iphone-rec" />

          <div className="text-image">
            <p className="watch">
              Watch <span className="some">something</span>
            </p>

            <p className="thing">something</p>
            <p className="inc">incredible.</p>
          </div>
        </div>

        <div className="search-ba">
          <h3>Search</h3>

          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </form>
        </div>

        <motion.div className="carousel">
          <h2>Movie</h2>
          <motion.div
            ref={carousel}
            drag="x"
            dragConstraints={{
              right: 0,
              left: -(width + carousel.current?.clientWidth || 0),
            }}
            className="inner-carousel"
          >
            {!(movies.Search && movies.Search.length > 0) ? (
              <div className="movies-error">
                <h3>{movies.Error} </h3>
              </div>
            ) : (
              movies.Search.map((movie, index) => (
                <motion.div
                  whileTap={{ cursor: "grabbing" }}
                  key={index}
                  className="item"
                >
                  <MovieCard key={index} data={movie} />
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>

        <motion.div className="carousel-2">
          <h2>Series</h2>
          <motion.div
            ref={carousel}
            drag="x"
            dragConstraints={{
              right: 0,
              left: -(width + carousel.current?.clientWidth || 0),
            }}
            className="inner-carousel-2"
          >
            {!(shows.Search && shows.Search.length > 0) ? (
              <div className="movies-error">
                <h3>{shows.Error} </h3>
              </div>
            ) : (
              shows.Search.map((movie, index) => (
                <motion.div
                  key={index}
                  whileTap={{ cursor: "grabbing" }}
                  className="item-2"
                >
                  <MovieCard key={index} data={movie} />
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default MovieListing;
