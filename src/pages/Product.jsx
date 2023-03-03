import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const Product = () => {
  const { id } = useParams();

  const client = useQueryClient();

  const { data, isLoading, error } = useQuery(
    ["products", id],
    () => axios.get(`products/${id}`),
    {
      initialData: () => {
        let cacheData = client.getQueryData(["products"]);

        if (cacheData) {
          return { data: cacheData.data.find((p) => p.id + "" === id) };
        } else {
          return undefined;
        }
      },
      onSuccess: (data) => {
        console.log("Data fetched successfully", data);
      },
      onError: (error) => {
        console.log("Data fetched with error", error);
      },
    }
  );

  const product = data?.data;

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error.message}</h1>;

  return product ? (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  ) : (
    <div>No Product</div>
  );
};

export default Product;
