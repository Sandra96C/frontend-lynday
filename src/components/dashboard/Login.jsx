import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth.js";
import { loginUser } from "../../services/auth.service";
import logo from "../../assets/logo-lynday.jpg";
import styles from "./Login.module.css";

// import SuccessMessage from "../ui/SuccessMessage";

const initialState = {
  email: "",
  password: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function Login() {
  const { login, user, authLoading, logout } = useAuth();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const isDisabled = !form.email || !form.password || loading;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      return "Introduzca su email";
    }

    if (!form.password.trim()) {
      return "Introduzca su contrasenya";
    }

    if (!emailRegex.test(form.email)) {
      return "Introduzca un email valido";
    }

    return;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const validationError = validateForm();
    if (validationError) {
      return setError(validationError);
    }

    setLoading(true);

    const user = {
      email: form.email.trim(),
      password: form.password,
    };

    try {
      const data = await loginUser(user);
      console.log("data1", data);

      login(data.user, data.token);

      setError(null);
      setForm(initialState);
      console.log("data2", data);
      navigate("/admin/home");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccess(null);
    }, 2000);
  }, [success]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user && token) {
      navigate("/admin/home");
    } else {
      logout();
    }
  }, [authLoading]);

  if (authLoading) {
    return <p>Verificando usuario...</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img
          src={logo}
          alt="Lynday Regalos"
          width={120}
          height={120}
          className={styles.logo}
        />
        <div className={styles.titles}>
          <h1 className={styles.title}>Bienvenido de nuevo</h1>
          <p className={styles.subtitle}>Accede al panel de Lynday Regalos</p>
        </div>
      </div>

      <section className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Contraseña</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btn} disabled={isDisabled}>
            {loading ? "Iniciando sesion" : "Iniciar sesion"}
          </button>
        </form>
      </section>

      <p className={styles.footer}>
        Detalles únicos y personalizados para crear y regalar momentos
        inolvidables.
      </p>
    </div>
  );
}

export default Login;
