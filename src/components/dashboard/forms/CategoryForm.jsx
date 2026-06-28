import { useState, useEffect } from "react";
import {
  updateCategory,
  createCategory,
} from "../../../services/category.service";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./form.module.css";

function CategoryForm({ category, onSuccess }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isEdit = Boolean(category?._id);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    sort: 0,
    slug: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const initFormData = () => {
    setFormData({
      name: category?.name || "",
      description: category?.description || "",
      slug: category?.slug || "",
      images: category?.images || null,
      sort: category?.sort || 0,
    });
  };

  const validateForm = () => {
    if (!formData.name) {
      return "El nombre es obligatorio";
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

    const categoryData = { ...formData };
    if (!categoryData.password) {
      delete categoryData.password;
    }

    try {
      if (isEdit) {
        await updateCategory(categoryData, category._id);
      } else {
        await createCategory(categoryData);
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
    }
  };

  useEffect(() => {
    initFormData();
  }, [category]);

  return (
    <section className="p-5">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Editar" : "Crear"} Categoria
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
            <label htmlFor="slug">URL</label>

            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="description">Descripcion</label>

            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="sort">Orden: </label>
            <input
              type="number"
              id="sort"
              name="sort"
              value={formData.sort}
              onChange={handleChange}
            />
          </div>
          {/* <div className="field">
            <label htmlFor="images">Imagenes</label> */}
          {/* <input
              type="text"
              id="images"
              name="images"
              value={formData.images}
              onChange={handleChange}
            /> */}
          {/* </div> */}
        </div>

        {error && <p className="error">{error}</p>}

        <div className={styles.formActions}>
          <button type="submit" className="btn">
            {isEdit ? "Editar categoria" : "Crear categoria"}
          </button>
        </div>
      </form>
    </section>
  );
}
export default CategoryForm;
