import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Các route khác sẽ thêm sau */}
      </Routes>
    </MainLayout>
  );
}

export default App;