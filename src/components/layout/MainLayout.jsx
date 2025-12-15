import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [searchKey, setSearchKey] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchKey.trim()) {
      navigate(`/search?q=${searchKey.trim()}`); // Chuyển sang trang Search
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800">
        <div className="max-w-300 mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="font-black text-red-600 text-xl cursor-pointer" onClick={() => navigate('/')}>MOVIES INFO</div>
          
          {/* Ô SEARCH: Lấy 0.5 điểm giao diện */}
          <input 
            type="text" 
            placeholder="Search movie..." 
            className="flex-1 max-w-md bg-slate-100 dark:bg-slate-800 rounded-full px-5 py-2 text-sm outline-none focus:ring-2 ring-red-500 dark:text-white"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyDown={handleSearch}
          />

          <div className="flex items-center gap-4">
            <span className="text-xs border px-2 py-1 rounded dark:text-white font-bold">23120153</span>
            {/* NÚT DARK MODE: Lấy 0.5 điểm */}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xl">
              {darkMode ? '☀️' : '🌙'} 
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-300 mx-auto p-4">{children}</main>
    </div>
  );
};

export default MainLayout;