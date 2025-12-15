import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../api/movieApi';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Gọi API lấy chi tiết movie theo ID từ Swagger
    fetchMovies(`/movies/${id}`).then(data => setMovie(data)); 
  }, [id]);

  if (!movie) return <div className="text-center py-20 dark:text-white font-bold italic">Loading detail...</div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Ảnh Poster */}
        <img src={movie.image} className="rounded-2xl shadow-2xl w-full border-4 border-white dark:border-slate-800" alt={movie.title} />
        
        {/* Thông tin chính */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-5xl font-black dark:text-white leading-tight">{movie.title} ({movie.year})</h1>
          
          <div className="flex flex-wrap gap-4 items-center">
            <p className="text-yellow-500 text-2xl font-bold">⭐ {movie.rate}/10</p>
            <span className="text-slate-400">|</span>
            {/* Bổ sung Runtime và Genres từ Swagger MovieDetail Schema */}
            <p className="text-slate-500 dark:text-slate-400 font-medium">{movie.runtime}</p>
            <div className="flex gap-2">
              {movie.genres?.map((genre, index) => (
                <span key={index} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded text-xs font-bold uppercase">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-red-600 pl-4">
            {movie.short_description}
          </p>

          {/* Bổ sung phần Đạo diễn (Directors) theo yêu cầu thang điểm */}
          {movie.directors && movie.directors.length > 0 && (
            <div className="pt-4">
              <h3 className="font-black text-red-600 uppercase tracking-widest text-sm mb-3">Director</h3>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 w-fit p-3 rounded-xl border dark:border-slate-800">
                <img src={movie.directors[0].image} className="w-12 h-12 rounded-full object-cover" alt="director" />
                <p className="font-bold dark:text-white">{movie.directors[0].name}</p>
              </div>
            </div>
          )}

          {/* Phần Cast giữ nguyên và thêm Dark Mode style */}
          <div className="pt-6 border-t dark:border-slate-800">
            <h3 className="font-black text-red-600 uppercase tracking-widest text-sm mb-6">Full Cast</h3>
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
              {movie.actors?.map(actor => (
                <div key={actor.id} className="min-w-25 text-center group">
                  <div className="relative overflow-hidden rounded-full w-20 h-20 mx-auto mb-3 border-2 border-transparent group-hover:border-red-600 transition-all">
                    <img src={actor.image} className="w-full h-full object-cover" alt={actor.name} />
                  </div>
                  <p className="text-[11px] font-black dark:text-white leading-tight">{actor.name}</p>
                  <p className="text-[9px] text-slate-500 uppercase mt-1">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 rounded-full transition-all active:scale-95 shadow-lg shadow-red-600/20">
            WATCH TRAILER
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;