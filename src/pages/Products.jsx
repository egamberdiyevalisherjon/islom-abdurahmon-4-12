import React from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const { data: users } = useQuery(["users"], () => axios.get("/users"));
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["products"],
    () => axios.get(`/products`),
    {
      cacheTime: 5000, // 30000
      staleTime: 5000, // 0
      retry: 2, // 4
      retryDelay: 10000,
      retryOnMount: false,
      enabled: !!users, // true
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error.message}</h1>;

  return (
    <div>
      <h2>Products</h2>
      <button onClick={refetch}>Refetch</button>
      <ul>
        {data?.data?.map((product) => (
          <li key={product.id}>
            {product.name}
            <Link to={`/products/${product.id}`}>See more details</Link>
          </li>
        ))}
      </ul>
      {isFetching && <p>Refreshing</p>}
    </div>
  );
};

export default Products;
