import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/movieApi';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // 1. Lấy danh sách phim phổ biến - Endpoint đúng theo Swagger là /movies/most-popular
      const popularData = await fetchMovies('/movies/most-popular');
      if (popularData) setPopularMovies(popularData.slice(0, 20));

      // 2. Lấy danh sách phim đánh giá cao cho Slide - Endpoint là /movies/top-rated
      const topRatedData = await fetchMovies('/movies/top-rated');
      if (topRatedData) setTopRatedMovies(topRatedData.slice(0, 5));
      
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <div className="text-center py-20 text-xl font-bold italic">Loading movies...</div>;

  return (
    <div className="space-y-10 pb-10">
      {/* SECTION 1: SLIDER 5 PHIM (Yêu cầu 0.5đ) */}
      <section className="relative h-[500px] w-full overflow-hidden rounded-2xl bg-slate-800 shadow-2xl group">
        {topRatedMovies.length > 0 && (
          <div className="relative h-full w-full">
            <img 
              src={topRatedMovies[0].poster_path} 
              className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
              alt="Featured" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex flex-col justify-end p-10">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">AWARD WINNER!</span>
              <h2 className="text-5xl font-extrabold text-white drop-shadow-lg">{topRatedMovies[0].title}</h2>
              <p className="text-gray-300 mt-4 max-w-2xl text-lg italic">
                "One of the year's genuine crowd pleasers!" - Featured Movie of the Day.
              </p>
            </div>
            {/* Nút điều hướng slide (Yêu cầu 0.5đ) */}
            <button className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-4 rounded-full text-white text-2xl transition-all opacity-0 group-hover:opacity-100">❮</button>
            <button className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-4 rounded-full text-white text-2xl transition-all opacity-0 group-hover:opacity-100">❯</button>
          </div>
        )}
      </section>

      {/* SECTION 2: MOST POPULAR (Yêu cầu 0.5đ) */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1.5 bg-red-600 rounded-full"></div>
          <h2 className="text-3xl font-bold tracking-tight">Most Popular</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {popularMovies.map(movie => (
            <div key={movie.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-slate-200 dark:bg-slate-800 aspect-[2/3]">
                <img 
                  src={movie.poster_path} 
                  alt={movie.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* HIỆU ỨNG HOVER: Hiện thông tin (Yêu cầu 0.5đ) */}
                <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center p-6 transition-all duration-300 backdrop-blur-sm">
                  <h4 className="text-white font-bold text-lg leading-tight mb-2">{movie.title}</h4>
                  <div className="flex flex-col gap-1">
                    <p className="text-red-500 font-bold text-sm uppercase tracking-widest">{movie.release_date?.split('-')[0]}</p>
                    <p className="text-yellow-400 font-bold">⭐ {movie.vote_average?.toFixed(1)}/10</p>
                  </div>
                  <button className="mt-6 border-2 border-white text-white font-bold text-xs px-5 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                    VIEW DETAIL
                  </button>
                </div>
              </div>
              <p className="mt-3 font-bold text-sm truncate px-1 group-hover:text-red-600 transition-colors">{movie.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;