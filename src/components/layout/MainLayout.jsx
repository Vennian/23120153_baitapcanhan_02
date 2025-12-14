import React, { useState, useEffect } from 'react';

const MainLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-black dark:text-white transition-colors">
      {/* Header theo mẫu: có MSSV (0.5 điểm) */}
      <header className="bg-red-100 dark:bg-red-950 py-1 text-center text-xs border-b">
        <span>&lt;23120153&gt;</span>
        <span className="mx-10 font-bold uppercase">Movies info</span>
        <button onClick={() => setDarkMode(!darkMode)} className="ml-4 border px-2 rounded">
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      {/* Nội dung chính: Max 1200px (Bắt buộc) */}
      <main className="max-w-[1200px] mx-auto p-4 min-h-screen">
        {children}
      </main>

      <footer className="bg-red-100 dark:bg-red-950 py-4 text-center text-sm border-t">
        Thực hiện bởi: 23120153
      </footer>
    </div>
  );
};

export default MainLayout;