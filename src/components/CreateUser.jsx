import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

const CreateUser = () => {
  const client = useQueryClient();
  const { mutate } = useMutation((values) => axios.post("/users", values), {
    onMutate: async (values) => {
      await client.cancelMutations();

      const oldData = client.getQueryData(["users"]);

      client.setQueryData(["users"], (users) => ({
        data: [...users.data, { ...values, id: crypto.randomUUID() }],
      }));

      return { oldData };
    },
    onError: (_error, _newUser, context) => {
      client.setQueryData(["users"], context.oldData);
    },
    onSettled: () => {
      client.invalidateQueries("users");
    },
  });

  function handleCreateUser(e) {
    e.preventDefault();

    let name = e.target[0].value;
    let age = +e.target[1].value;

    mutate({ name, age });
    e.target.reset();
  }

  return (
    <div>
      <form onSubmit={handleCreateUser}>
        <input type="text" name="name" placeholder="name" />
        <input type="number" name="age" placeholder="age" />
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateUser;
