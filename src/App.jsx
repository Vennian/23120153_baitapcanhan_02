import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<h2 className="text-xl font-bold">Trang chủ</h2>} />
        <Route path="/search" element={<div>Trang Tìm kiếm</div>} />
        <Route path="/movie/:id" element={<div>Chi tiết phim</div>} />
      </Routes>
    </MainLayout>
  );
}

export default App;