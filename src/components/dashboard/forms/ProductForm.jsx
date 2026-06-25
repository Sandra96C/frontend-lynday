import { useState, useEffect } from "react";
import styles from "./form.module.css";
import {
  updateProduct,
  createProduct,
} from "../../../services/product.service";
import { useCategory } from "../../../hooks/useCategory";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ProductForm({ product, onSuccess }) {
  const isEdit = Boolean(product?._id);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  const { categories } = useCategory();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    categories: [],
    level: "basic",
    active: false,
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
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      price: product?.price || "",
      stock: product?.stock || "",
      categories: product?.categories || [],
      level: product?.level || "basic",
      active: product?.active,
    });
  };

  const validateForm = () => {
    if (!formData.name) {
      return "El nombre es obligatorio";
    }

    if (!formData.price) {
      return "El precio es obligatorio";
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

    try {
      if (isEdit) {
        await updateProduct(formData, product._id);
      } else {
        await createProduct(formData);
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
  }, [product]);

  return (
    <section className="p-5">
      <h1 className="text-2xl font-bold mb-2">
        {isEdit ? "Editar" : "Crear"} Producto
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
            <label htmlFor="slug">Url: </label>
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
          <div className="grid grid-cols-2 gap-2">
            <div className="field">
              <label htmlFor="stock">Stock</label>

              <input
                type="text"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="price">Price: </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="field">
              <label htmlFor="level">Nivel: </label>
              <select
                className="select"
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="basic">Basico</option>
                <option value="medium">Medio</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="categories">Categorias</label>
              <select
                className="select"
                id="categories"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
              >
                <option value=""></option>
                {categories.map((c) => (
                  <option value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-2 mb-4">
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
            {isEdit ? "Editar producto" : "Crear producto"}
          </button>
        </div>
      </form>
    </section>
  );
}
export default ProductForm;
