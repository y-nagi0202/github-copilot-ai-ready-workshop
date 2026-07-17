import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  search: string;
}

export function ProductGrid({ products, search }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="empty">
        該当する商品が見つかりませんでした。別のキーワードでお試しください。
      </p>
    );
  }

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} search={search} />
      ))}
    </div>
  );
}
