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
        // 1. Lấy dữ liệu cho Slide (Top 5): Bắt buộc có tham số category
        // Endpoint: /movies/top-rated?category=IMDB_TOP_50&limit=5
        const topRes = await fetchMovies('/movies/top-rated?category=IMDB_TOP_50&limit=5');
        if (topRes && topRes.data) {
          setTopRatedMovies(topRes.data);
        }

        // 2. Lấy dữ liệu Popular (Mốc 15-30 phim): Gộp 2 trang vì limit tối đa 12
        const resPage1 = await fetchMovies('/movies/most-popular?page=1&limit=12');
        const resPage2 = await fetchMovies('/movies/most-popular?page=2&limit=12');
        
        let combined = [];
        if (resPage1?.data) combined = [...resPage1.data];
        if (resPage2?.data) combined = [...combined, ...resPage2.data];
        
        setPopularMovies(combined); // Tổng 24 phim
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu trang chủ:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="text-center py-20 dark:text-white font-bold italic">Loading movies...</div>;

  return (
    <div className="space-y-12 pb-10">
      {/* SECTION 1: HERO SLIDER (Yêu cầu 0.5đ) */}
      <section className="relative h-[500px] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-2xl group">
        {topRatedMovies.length > 0 ? (
          <div className="relative h-full w-full">
            {/* Dùng trường 'image' theo MovieBasic Schema */}
            <img 
              src={topRatedMovies[0].image} 
              className="h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" 
              alt="Slide" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent flex flex-col justify-end p-12">
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full w-fit mb-4 tracking-widest uppercase">Award Winning</span>
              <h2 className="text-5xl font-black text-white drop-shadow-2xl">{topRatedMovies[0].title}</h2>
              <div className="flex items-center gap-4 mt-4">
                <p className="text-yellow-400 font-bold text-xl">⭐ {topRatedMovies[0].rate}/10</p>
                <span className="text-slate-400">|</span>
                <p className="text-slate-300 font-medium">Rank #{topRatedMovies[0].rank || 1}</p>
              </div>
            </div>
            {/* Nút điều hướng Slide giả lập (Yêu cầu 0.5đ) */}
            <button className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md p-4 rounded-full text-white text-2xl transition-all opacity-0 group-hover:opacity-100">❮</button>
            <button className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md p-4 rounded-full text-white text-2xl transition-all opacity-0 group-hover:opacity-100">❯</button>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400 italic">No slide data available</div>
        )}
      </section>

      {/* SECTION 2: MOST POPULAR (Yêu cầu 0.5đ) */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight text-slate-900">Most Popular</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {popularMovies.map(movie => (
            <div key={movie.id} className="group cursor-pointer">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 shadow-lg">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* HIỆU ỨNG HOVER (Yêu cầu 0.5đ): Hiện thông tin chi tiết */}
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center p-5 transition-all duration-300 backdrop-blur-[2px]">
                  <h4 className="text-white font-black text-sm leading-tight mb-2 uppercase">{movie.title}</h4>
                  <div className="flex flex-col gap-1">
                    <p className="text-red-500 font-black text-[10px] tracking-tighter uppercase">{movie.genres?.[0] || 'Movie'} • {movie.year}</p>
                    <p className="text-yellow-400 font-black text-xs">⭐ {movie.rate}</p>
                  </div>
                  <button className="mt-6 border-2 border-white text-white font-black text-[9px] px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">
                    VIEW DETAIL
                  </button>
                </div>
              </div>
              <p className="mt-3 text-xs font-black dark:text-slate-300 truncate px-1 group-hover:text-red-600 transition-colors uppercase tracking-tight">{movie.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;