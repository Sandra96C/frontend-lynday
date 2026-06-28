const URL_API = `${import.meta.env.VITE_API_URL}/product-category`;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getCategories = async () => {
  const token = getToken();
  const response = await fetch(URL_API);
  if (!response.ok) {
    throw new Error("Error al obtener las categorias");
  }
  const data = await response.json();
  return data;
};

export const getCategoryById = async (id) => {
  const token = getToken();
  const response = await fetch(`${URL_API}/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener la categoria");
  }
  const data = await response.json();
  return data;
};

export const deleteCategory = async (id) => {
  const token = getToken();
  const response = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = new Error("Error al borrar categoria");
    error.status = response.status;
    throw error;
  }
  return true;
};

export const createCategory = async (category) => {
  const token = getToken();
  const response = await fetch(URL_API + "/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || `Error al crear nueva categoria`);
    error.status = response.status;
    throw error;
  }
  return data;
};

export const updateCategory = async (category, id) => {
  const token = getToken();
  const response = await fetch(URL_API + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || `Error al editar la categoria`);
    error.status = response.status;
    throw error;
  }
  return data;
};
