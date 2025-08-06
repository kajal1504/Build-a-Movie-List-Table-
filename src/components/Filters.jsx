import React from "react";

const Filters = ({ titleFilter, setTitleFilter, genres, selectedGenres, setSelectedGenres }) => {
  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenres(
      selectedGenres.includes(value)
        ? selectedGenres.filter((g) => g !== value)
        : [...selectedGenres, value]
    );
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      {/* Title Filter */}
      <input
        type="text"
        placeholder="Filter by title..."
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
        className="border rounded px-3 py-2 w-full md:w-1/2"
      />

      {/* Genre Filter */}
      <select
        multiple
        value={selectedGenres}
        onChange={handleGenreChange}
        className="border rounded px-3 py-2 w-full md:w-1/2 h-32"
      >
        {genres.map((genre, idx) => (
          <option key={idx} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
