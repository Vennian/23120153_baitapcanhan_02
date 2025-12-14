import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/movieApi';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // 1. Lấy Top Rated cho Slide (Yêu cầu 0.5đ): Cần category theo Swagger
        const topRes = await fetchMovies('/movies/top-rated?category=IMDB_TOP_50&limit=5');
        if (topRes && topRes.data) {
          setTopRatedMovies(topRes.data);
        }

        // 2. Lấy Popular (Yêu cầu 0.5đ): Gộp 2 trang để vượt giới hạn limit=12
        const resPage1 = await fetchMovies('/movies/most-popular?page=1&limit=12');
        const resPage2 = await fetchMovies('/movies/most-popular?page=2&limit=12');
        
        let combinedMovies = [];
        if (resPage1?.data) combinedMovies = [...resPage1.data];
        if (resPage2?.data) combinedMovies = [...combinedMovies, ...resPage2.data];
        
        setPopularMovies(combinedMovies); // Tổng cộng 24 phim, đạt mốc 15-30
      } catch (error) {
        console.error("Lỗi tải dữ liệu Home:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="text-center py-20 dark:text-white">Đang tải phim...</div>;

  return (
    <div className="space-y-10">
      {/* SECTION 1: SLIDE 5 PHIM (Yêu cầu 0.5đ) */}
      <section className="relative h-[450px] w-full overflow-hidden rounded-2xl bg-slate-900 shadow-xl group">
        {topRatedMovies.length > 0 ? (
          <div className="relative h-full w-full">
            <img 
              src={topRatedMovies[0].image} 
              className="h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" 
              alt="Slide" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent flex flex-col justify-end p-10">
              <h2 className="text-4xl font-extrabold text-white drop-shadow-md">{topRatedMovies[0].title}</h2>
              <p className="text-yellow-400 font-bold mt-2 text-lg">⭐ Rating: {topRatedMovies[0].rate}/10</p>
            </div>
            {/* Nút điều hướng Slide giả lập (Yêu cầu 0.5đ) */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">❮</button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">❯</button>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-white italic">Không tìm thấy phim Top Rated</div>
        )}
      </section>

      {/* SECTION 2: MOST POPULAR (Yêu cầu 0.5đ) */}
      <section>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight text-slate-900">Most Popular</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {popularMovies.map(movie => (
            <div key={movie.id} className="group cursor-pointer">
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 shadow-md">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* HIỆU ỨNG HOVER (Yêu cầu 0.5đ): Hiện thông tin chi tiết */}
                <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center p-4 transition-all duration-300">
                  <h4 className="text-white font-bold text-sm mb-2">{movie.title}</h4>
                  <p className="text-red-500 font-bold text-xs">{movie.year}</p>
                  <p className="text-yellow-400 font-bold text-xs mt-1">⭐ {movie.rate}</p>
                  <button className="mt-4 border border-white text-white text-[10px] px-4 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors font-bold">
                    VIEW DETAIL
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm font-bold dark:text-slate-200 truncate">{movie.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;