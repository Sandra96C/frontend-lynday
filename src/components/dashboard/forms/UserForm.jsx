import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import styles from "./UserForm.module.css";
import { updateUser } from "../../../services/user.service";
import { registerUser } from "../../../services/auth.service";

function UserForm({ user, onSuccess }) {
  const isEdit = Boolean(user?._id);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    active: false,
  });

  const [passwordBefore, setPasswordBefore] = useState();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const initFormData = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      role: user?.role || "user",
      active: user?.active || false,
    });
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    if (!formData.name) {
      return "El nombre es obligatorio";
    }

    if (!formData.email) {
      return "El email es obligatorio";
    }

    if (!formData.role) {
      return "El role es obligatorio";
    }

    if (!emailRegex.test(formData.email)) {
      return "El formato del email no es válido (ejemplo@dominio.com)";
    }

    if (!isEdit) {
      if (!formData.password) {
        return "La contrasenya es obligatoria";
      }

      if (formData.password.length < 6) {
        return "La contrasenya debe contener minimo 6 caracteres";
      }
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSaving(true);

    const userData = { ...formData };
    if (!userData.password) {
      delete userData.password;
    }

    try {
      if (isEdit) {
        await updateUser(userData, user._id);
      } else {
        await registerUser(userData);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error.status == 401) {
        logout();
        navigate("/login");
        return;
      }
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    initFormData();
  }, [user]);

  return (
    <section className="p-5">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Editar" : "Crear"} Usuario
      </h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <div className="field">
            <label htmlFor="name">Nombre: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>

            <div className="passwordWrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className={styles.icon} />
                ) : (
                  <EyeIcon className={styles.icon} />
                )}
              </button>
            </div>
          </div>

          <div className="field">
            <label htmlFor="role">Rol: </label>
            <select
              className="select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div>
            <label htmlFor="active">Activo: </label>
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className={styles.formActions}>
          <button type="submit" className="btn">
            {loading
              ? isEdit
                ? "Editando usuario..."
                : "Creando usuario..."
              : isEdit
                ? "Editar usuario"
                : "Crear usuario"}
          </button>
        </div>
      </form>
    </section>
  );
}
export default UserForm;
