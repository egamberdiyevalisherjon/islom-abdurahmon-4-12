import React from "react";
import useFetch from "../hooks/useFetch";

const Products = () => {
  const { isLoading, error, data } = useFetch("/products");

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error.message}</h1>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data?.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
