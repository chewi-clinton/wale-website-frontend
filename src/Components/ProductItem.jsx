import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice.js";
import API_BASE_URL from "../constant/backend_url.jsx";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="product-item">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability:
              product.stock > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
          },
        })}
      </script>
      {product.image && (
        <img
          src={`${API_BASE_URL.replace("/api", "")}${product.image}`}
          alt={product.name}
        />
      )}
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;
