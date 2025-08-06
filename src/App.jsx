import React, { useEffect, useState } from "react";
import MovieTable from "./components/MovieTable";
import Filters from "./components/Filters";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    // Fetch movies JSON
    fetch("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);

        // Extract all unique genres
        const genres = [...new Set(data.flatMap((movie) => movie.genres))].sort();
        setAllGenres(genres);
      });
  }, []);
   
  

  // Filter logic
  useEffect(() => {
    let filtered = movies;

    // Filter by title
    if (titleFilter) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.genres.some((genre) => selectedGenres.includes(genre))
      );
    }

    setFilteredMovies(filtered);
  }, [titleFilter, selectedGenres, movies]);

  return (
    <div className="max-w-7xl mx-auto p-7">
      <h1 className="text-2xl font-bold mb-6 text-center">🎬 Movie List</h1>

      <Filters
        titleFilter={titleFilter}
        setTitleFilter={setTitleFilter}
        genres={allGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      <MovieTable movies={filteredMovies} />
    </div>
  );
};

export default App;
