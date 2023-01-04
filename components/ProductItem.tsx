import Link from "next/link";
import React from "react";

type Product = {
  name: string;
  slug: string;
  category?: string;
  image: string;
  price: number;
  brand: string;
  rating?: number;
  numReviews?: number;
  countInStock?: number;
  description?: string;
  isFeatured?: boolean;
  banner?: string;
};

type ProductItemProps = {
  product?: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="card font-sans">
      <Link href={`/product/${product?.slug}`}>
        <img
          src={product?.image}
          alt={product?.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col justify-center items-center p-5">
        <Link href={`/product/${product?.slug}`}>
          <h2 className="text-lg">{product?.name}</h2>
        </Link>
        <p className="mb-2">{product?.brand}</p>
        <p>${product?.price}</p>
        <button type="button" className="primary-button">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
