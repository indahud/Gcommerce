import Head from "next/head";
import { fromImageToUrl, API_URL } from "../../utils/urls";

const Product = ({ product }) => {
  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <h3>{product.name}</h3>
      <img src={fromImageToUrl(product.image)} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      <p>{product.content}</p>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`);
  const found = await product_res.json();

  return {
    props: {
      product: found[0] // API respose for filters is an array
    }
  };
}

export async function getStaticPaths() {
  // Retrieve all paths
  const products_res = await fetch(`${API_URL}/products/`);
  const products = await products_res.json();
  return {
    paths: products.map((product) => ({
      params: {
        slug: String(product.slug)
      }
    })),
    fallback: false // Returns 404 if params doesnt match
  };
  // Return All paths
}

export default Product;
