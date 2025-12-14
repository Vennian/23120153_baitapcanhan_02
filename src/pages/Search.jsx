import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovies } from '../api/movieApi';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      // Gọi API search theo từ khóa q
      fetchMovies(`/movies/search?q=${query}`).then(res => {
        if (res?.data) setResults(res.data);
      });
    }
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Results for: <span className="text-red-600">"{query}"</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {results.map(movie => (
          <div key={movie.id} className="rounded-lg overflow-hidden shadow-lg bg-slate-800">
            <img src={movie.image} className="w-full h-64 object-cover" />
            <div className="p-3">
              <p className="text-white font-bold text-sm truncate">{movie.title}</p>
              <p className="text-slate-400 text-xs">{movie.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;