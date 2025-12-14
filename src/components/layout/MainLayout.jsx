import React, { useState, useEffect } from 'react';

const MainLayout = ({ children }) => {
  // Lưu trạng thái dark mode vào localStorage để khi F5 không bị mất
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-red-600 tracking-tighter text-xl">MOVIES INFO</div>
          
          <div className="flex items-center gap-6">
            <span className="text-xs font-mono border px-2 py-1 rounded dark:border-slate-700">
              &lt;23120153&gt; {/* MSSV bắt buộc */}
            </span>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-red-500 transition-all"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto p-4 min-h-[calc(100vh-130px)]">
        {children}
      </main>

      <footer className="py-8 text-center border-t dark:border-slate-800 text-slate-500 text-sm">
        BÀI TẬP CÁ NHÂN 02 - MSSV: 23120153
      </footer>
    </div>
  );
};

export default MainLayout;