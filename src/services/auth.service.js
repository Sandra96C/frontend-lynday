const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const registerUser = async (user) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Error al registrar usuario`);
  }

  return data;
};

export const loginUser = async (user) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `Error al iniciar session`);
  }

  return data;
};

export const getProfileDb = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No estas autorizado");
  }

  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log("getProfileDb", data);

  if (!response.ok) {
    const error = new Error(data.error || "Error al obtener el perfil");
    error.status = response.status;
    throw error;
  }

  return data;
};
