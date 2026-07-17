import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatPrice } from '../lib/price';

interface ProductCardProps {
  product: Product;
  search: string;
}

export function ProductCard({ product, search }: ProductCardProps) {
  return (
    <Link
      className="card card--link"
      to={{ pathname: `/product/${product.id}`, search }}
    >
      <div className="card__imagewrap">
        <img
          className="card__image"
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
        />
      </div>
      <div className="card__body">
        <h2 className="card__name">{product.name}</h2>
        <p className="card__description">{product.description}</p>
        <p className="card__price">
          ¥{formatPrice(product.price)}
          <span className="card__tax">税込</span>
        </p>
      </div>
    </Link>
  );
}
