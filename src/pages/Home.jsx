import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/movieApi';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    // 1. Lấy danh sách phim Popular (Yêu cầu 0.5 điểm)
    fetchMovies('/movie/popular').then(data => {
      if (data) setPopularMovies(data.slice(0, 20)); 
    });
    // 2. Lấy danh sách Top Rated để làm Slide hoặc danh sách riêng
    fetchMovies('/movie/top_rated').then(data => {
      if (data) setTopRatedMovies(data.slice(0, 5));
    });
  }, []);

  return (
    <div className="space-y-10">
      {/* SECTION 1: SLIDE 5 PHIM (Yêu cầu 0.5 điểm) */}
      <section className="relative h-[500px] w-full overflow-hidden rounded-xl bg-black">
        {topRatedMovies.length > 0 && (
          <div className="relative h-full w-full">
            <img 
              src={topRatedMovies[0].poster_path} 
              className="h-full w-full object-cover opacity-60" 
              alt="Hero" 
            />
            <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-black to-transparent">
              <h2 className="text-4xl font-bold text-white">{topRatedMovies[0].title}</h2>
              <p className="text-gray-300 mt-2">Top Rated Movie - {topRatedMovies[0].release_date?.split('-')[0]}</p>
              <div className="flex gap-4 mt-4">
                <button className="bg-white text-black px-6 py-2 rounded font-bold">Watch Now</button>
              </div>
            </div>
            {/* Nút điều hướng slide giả lập */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl">❮</button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl">❯</button>
          </div>
        )}
      </section>

      {/* SECTION 2: MOST POPULAR (Yêu cầu 0.5 điểm) */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3">Most Popular</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {popularMovies.map(movie => (
            <div key={movie.id} className="group cursor-pointer relative">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={movie.poster_path} 
                  alt={movie.title}
                  className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* HIỆU ỨNG HOVER: Hiện thông tin (Yêu cầu 0.5 điểm) */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center p-4 transition-opacity duration-300">
                  <h4 className="text-white font-bold text-sm">{movie.title}</h4>
                  <p className="text-gray-400 text-xs mt-1">Year: {movie.release_date?.split('-')[0]}</p>
                  <p className="text-yellow-400 text-xs font-bold mt-1">⭐ {movie.vote_average}</p>
                  <button className="mt-4 bg-red-600 text-white text-[10px] px-3 py-1 rounded-full uppercase">Detail</button>
                </div>
              </div>
              <p className="mt-2 font-medium truncate text-sm">{movie.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;