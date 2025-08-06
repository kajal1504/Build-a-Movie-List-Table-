import React from "react";

const MovieTable = ({ movies }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Thumbnail</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Cast</th>
            <th className="border px-4 py-2">Genres</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map((movie, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <img
                    src={`https://qqcdnpictest.mxplay.com/pic/048583d8c50235757c926f6b9dc75e6c/en/2x3/312x468/test_pic1749480794937_badged_1752555620744.webp `}
                    alt={movie.title}
                    className="w-20 h-24 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-2 font-medium">{movie.title}</td>
                <td className="border px-4 py-2 text-center">{movie.year}</td>
                <td className="border px-4 py-2">{movie.cast.join(", ") || "N/A"}</td>
                <td className="border px-4 py-2">{movie.genres.join(", ") || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">No movies found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
