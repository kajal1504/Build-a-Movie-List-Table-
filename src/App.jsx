import React, { useEffect, useState } from "react";
import Filters from "./components/Filters";
import MovieTable from "./components/MovieTable";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Fetch movies from URL
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
        const genres = [...new Set(data.flatMap((movie) => movie.genres))].sort();
        setAllGenres(genres);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = movies;

    if (titleFilter) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.genres.some((g) => selectedGenres.includes(g))
      );
    }

    setFilteredMovies(filtered);
    setCurrentPage(1); // reset page on filter change
  }, [titleFilter, selectedGenres, movies]);

  // Pagination calculations
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🎬 Movie List</h1>

      <Filters
        titleFilter={titleFilter}
        setTitleFilter={setTitleFilter}
        genres={allGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      <MovieTable movies={currentMovies} />

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {/* previous button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === 1}>
          Prev
        </button>

        {/* next button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === totalPages}>
         Next
        </button>
      </div>
    </div>
  );
}
