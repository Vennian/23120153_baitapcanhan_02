import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../api/movieApi';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovies(`/movies/${id}`).then(data => setMovie(data)); // Gọi API lấy chi tiết
  }, [id]);

  if (!movie) return <div className="text-center py-20">Loading detail...</div>;

  return (
    <div className="grid md:grid-cols-3 gap-10">
      <img src={movie.image} className="rounded-2xl shadow-2xl w-full" alt={movie.title} />
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-5xl font-black">{movie.title} ({movie.year})</h1>
        <p className="text-yellow-500 text-2xl font-bold">⭐ {movie.rate}/10</p>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{movie.short_description}</p>
        <div className="pt-6 border-t dark:border-slate-800">
          <h3 className="font-bold mb-4">Cast</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {movie.actors?.map(actor => (
              <div key={actor.id} className="min-w-[100px] text-center">
                <img src={actor.image} className="w-20 h-20 rounded-full object-cover mx-auto mb-2" />
                <p className="text-[10px] font-bold">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;