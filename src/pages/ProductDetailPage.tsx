import { Link, useLocation, useParams } from 'react-router-dom';
import { products as fallbackProducts } from '../data/products';
import { formatPrice } from '../lib/price';
import type { Product } from '../types';

interface ProductDetailPageProps {
  products?: Product[];
}

export function ProductDetailPage({
  products = fallbackProducts,
}: ProductDetailPageProps) {
  const { id } = useParams();
  const location = useLocation();
  const productId = Number(id);
  const product = Number.isInteger(productId)
    ? products.find((item) => item.id === productId)
    : undefined;

  const backTo = { pathname: '/', search: location.search };

  if (!product) {
    return (
      <section className="detail detail--missing">
        <div className="detail__content">
          <Link className="back-link" to={backTo}>
            ← 一覧へ戻る
          </Link>
          <p className="detail__eyebrow">Product not found</p>
          <h2 className="detail__title">商品が見つかりませんでした</h2>
          <p className="detail__description">
            指定された商品は存在しないか、すでに取り扱いを終了しています。
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Link className="back-link" to={backTo}>
        ← 一覧へ戻る
      </Link>

      <section className="detail">
        <div className="detail__media">
          <img className="detail__image" src={product.imageUrl} alt={product.name} />
        </div>

        <div className="detail__content">
          <p className="detail__eyebrow">Outdoor eShop Selection</p>
          <h2 className="detail__title">{product.name}</h2>
          <p className="detail__description">{product.description}</p>
          <p className="detail__price">
            ¥{formatPrice(product.price)}
            <span className="detail__tax">税込</span>
          </p>
          <p className="detail__note">
            山行やキャンプで使いやすいよう、持ち運びやすさと実用性を重視して選定したアイテムです。
          </p>
        </div>
      </section>
    </>
  );
}
