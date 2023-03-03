import React from "react";
import useFetch from "../hooks/useFetch";
import { useQuery } from "react-query";
import axios from "axios";
import CreateUser from "../components/CreateUser";

const Users = () => {
  const { isLoading, error, data } = useQuery(["users"], () =>
    axios.get("/users")
  );

  // const { isLoading, error, data } = useFetch("/users");

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error.message}</h1>;

  console.log(data);

  return (
    <div>
      <h2>Users</h2>
      <CreateUser />
      <ul>
        {data?.data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
