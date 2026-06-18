const URL_API = `${import.meta.env.VITE_API_URL}/user`;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getUsers = async () => {
  const token = getToken();
  console.log("getUsers");
  const response = await fetch(URL_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  const data = await response.json();
  console.log("data", data);
  return data;
};

export const deleteUser = async (id) => {
  const token = getToken();

  const response = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error("Error al borrar usuario");
    error.status = response.status;
    throw error;
  }

  return true;
};

export const createUser = async (user) => {
  const token = getToken();

  const response = await fetch(URL_API + "/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || `Error al crear el usuario`);
    error.status = response.status;
    throw error;
  }

  return data;
};

export const updateUser = async (user, id) => {
  const token = getToken();

  const response = await fetch(URL_API + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || `Error al editar el usuario`);
    error.status = response.status;
    throw error;
  }

  return data;
};
