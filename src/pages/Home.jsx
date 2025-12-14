import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/movieApi';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Gọi đúng Endpoint từ Swagger: /movies/most-popular
      const popularRes = await fetchMovies('/movies/most-popular?limit=30');
      if (popularRes && popularRes.data) {
        setPopularMovies(popularRes.data);
      }

      // Gọi đúng Endpoint từ Swagger: /movies/top-rated
      const topRes = await fetchMovies('/movies/top-rated?limit=5');
      if (topRes && topRes.data) {
        setTopRatedMovies(topRes.data.slice(0, 5));
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-10">
      {/* Slide 5 phim (0.5đ) */}
      <section className="h-[400px] bg-slate-900 rounded-xl overflow-hidden relative">
        {topRatedMovies[0] && (
          <div className="h-full w-full relative">
            {/* Sử dụng trường 'image' từ MovieBasic Schema */}
            <img src={topRatedMovies[0].image} className="w-full h-full object-cover opacity-50" />
            <div className="absolute bottom-10 left-10 text-white">
              <h2 className="text-4xl font-bold">{topRatedMovies[0].title}</h2>
              <p className="text-yellow-400">Rating: {topRatedMovies[0].rate} ⭐</p>
            </div>
          </div>
        )}
      </section>

      {/* Danh sách phim phổ biến (0.5đ) */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3">Most Popular</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {popularMovies.map(movie => (
            <div key={movie.id} className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer">
              <img src={movie.image} className="w-full h-[300px] object-cover transition-transform group-hover:scale-110" />
              {/* Hiệu ứng Hover (0.5đ) */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white p-4 transition-opacity">
                <h4 className="font-bold text-sm">{movie.title}</h4>
                <p className="text-xs mt-2">Năm: {movie.year}</p>
                <p className="text-yellow-400 text-xs">⭐ {movie.rate}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;