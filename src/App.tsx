import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { products } from './data/products';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductListPage } from './pages/ProductListPage';

export default function App() {
  return (
    <div className="app">
      <Header productCount={products.length} />

      <main className="main">
        <Routes>
          <Route path="/" element={<ProductListPage products={products} />} />
          <Route path="/product/:id" element={<ProductDetailPage products={products} />} />
          <Route path="*" element={<ProductListPage products={products} />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>Outdoor eShop — GitHub Copilot ワークショップ用サンプル</p>
      </footer>
    </div>
  );
}
