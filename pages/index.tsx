import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import data from "../utils/data";

type Product = {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  isFeatured: boolean;
  banner: string;
};

export default function Home() {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </Layout>
  );
}
