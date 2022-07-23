import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { Settings } from "../../common/settings";
import { useSelector } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import { ReactComponent as Rectangle } from "../../images/Rectangle 5.svg";
import "./MovieListing.scss";

const MovieListing = () => {
  const [term, setTerm] = useState("");
  const [width, setWidth] = useState(0);

  const carousel = useRef();

  useEffect(() => {
    // console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth + carousel.current.offsetWidth);
  }, []);

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
          <div className="text-image">
            <p>Watch</p>
            <p>something</p>
            <p>incredible.</p>
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

        <motion.div
          ref={carousel}
          whileTap={{ cursor: "grabbing" }}
          className="carousel"
        >
          <h2>Movies</h2>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel"
          >
            {!(movies.Search && movies.Search.length > 0) ? (
              <div className="movies-error">
                <h3>{movies.Error} </h3>
              </div>
            ) : (
              movies.Search.map((movie, index) => (
                <motion.div key={index} className="item">
                  <MovieCard key={index} data={movie} />
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>

        <motion.div
          ref={carousel}
          whileTap={{ cursor: "grabbing" }}
          className="carousel-2"
        >
          <h2>Shows</h2>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel-2"
          >
            {!(shows.Search && shows.Search.length > 0) ? (
              <div className="movies-error">
                <h3>{shows.Error} </h3>
              </div>
            ) : (
              shows.Search.map((movie, index) => (
                <motion.div key={index} className="item-2">
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
