import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import { SearchBar } from '../components/SearchBar';
import { searchProducts } from '../lib/search';
import type { Product } from '../types';

interface ProductListPageProps {
  products: Product[];
}

export function ProductListPage({ products }: ProductListPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const visibleProducts = useMemo(
    () => searchProducts(products, query),
    [products, query],
  );

  const handleQueryChange = (nextQuery: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextQuery.trim() === '') {
      nextParams.delete('q');
    } else {
      nextParams.set('q', nextQuery);
    }

    setSearchParams(nextParams, { replace: true });
  };

  const search = searchParams.toString();

  return (
    <>
      <div className="main__intro">
        <h2 className="main__heading">おすすめのアウトドア用品</h2>
        <p className="main__lead">
          登山・キャンプに役立つアイテムを取り揃えています。キーワードで検索してみましょう。
        </p>
      </div>

      <SearchBar value={query} onChange={handleQueryChange} />

      <p className="result-count">{visibleProducts.length} 件の商品</p>

      <ProductGrid
        products={visibleProducts}
        search={search === '' ? '' : `?${search}`}
      />
    </>
  );
}
