import React from "react";
import useFetch from "../hooks/useFetch";

const Users = () => {
  const { isLoading, error, data } = useFetch("/users");

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error.message}</h1>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
