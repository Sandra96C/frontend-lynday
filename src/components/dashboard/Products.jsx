import { useState, useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCategory } from "../../hooks/useCategory";
import {
  Pencil,
  Trash,
  Eye,
  CircleFadingPlus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import FloatingButton from "../../shared/FloatingButton";
import ConfirmModal from "../../shared/ConfirmModal";
import styles from "./Products.module.css";
import ProductForm from "./forms/ProductForm";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../services/product.service";
import FormModal from "../../shared/FormModal";

function Products() {
  const { products, loadProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const navigate = useNavigate();
  const [productToDelete, setProductToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectProduct = (product) => {
    setIsModalOpen(true);
    setCreatingProduct(false);
    setSelectedProduct(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete);
      loadProducts();
    } catch (error) {
      console.error("Error al borrar producto:", error);
    } finally {
      setProductToDelete(null);
    }
  };

  const handleCreateClick = () => {
    setIsModalOpen(true);
    setSelectedProduct(null);
    setCreatingProduct(true);
  };

  // const handleFormSuccess = () => {
  //   loadProducts();
  //   setSelectedProduct(null);
  //   setCreatingProduct(false);
  // };

  const { uncategorized, grouped } = useMemo(() => {
    const uncategorized = products.filter((p) => {
      return !p.categories || p.categories.length === 0;
    });

    const grouped = new Map();

    products.forEach((product) => {
      if (!product.categories || product.categories.length === 0) return;

      product.categories.forEach((category) => {
        const categoryName = category.name;
        const categoryId = category._id;

        if (!grouped.has(categoryId)) {
          grouped.set(categoryId, {
            name: categoryName,
            products: [],
          });
        }

        grouped.get(categoryId).products.push(product);
      });
    });

    return {
      uncategorized,
      grouped,
    };
  }, [products]);

  const [collapsed, setCollapsed] = useState([]);

  const toggle = (category) => {
    setCollapsed((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className="mr-15 mb-10 text-2xl font-bold">Productos</h1>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Nivel</th>
              <th>Activo</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {uncategorized.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                </td>
                <td>{formatCurrency(product.price)}</td>
                <td>
                  <span className={`${styles.badge} ${styles[product.level]}`}>
                    {product.level}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      product.active
                        ? `${styles.status} ${styles.active}`
                        : `${styles.status} ${styles.inactive}`
                    }
                  >
                    {product.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <Pencil
                      className={`${styles.icon}`}
                      onClick={() => selectProduct(product)}
                    />

                    <Eye
                      className={`${styles.icon}`}
                      onClick={() => navigate(`/admin/products/${product._id}`)}
                    />
                    <Trash
                      className={`${styles.icon} red`}
                      onClick={() => setProductToDelete(product._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {[...grouped.entries()].map(([category, obj]) => {
              const isCollapsed = collapsed.includes(category);

              return (
                <>
                  <tr key={category} className={`${styles.groupRow}`}>
                    <td colSpan="5">
                      <button
                        className={`${styles.groupButton}`}
                        onClick={() => toggle(category)}
                      >
                        {isCollapsed ? (
                          <ChevronRight size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                        {obj.name.charAt(0).toUpperCase() + obj.name.slice(1)}

                        <span className={`${styles.countBadge}`}>
                          {obj.length}
                        </span>
                      </button>
                    </td>
                  </tr>

                  {!isCollapsed &&
                    obj.products.map((product) => (
                      <tr key={product._id}>
                        <td>
                          {product.name.charAt(0).toUpperCase() +
                            product.name.slice(1)}
                        </td>

                        <td>{formatCurrency(product.price)}</td>

                        <td>
                          <span
                            className={`${styles.badge} ${styles[product.level]}`}
                          >
                            {product.level}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              product.active
                                ? `${styles.status} ${styles.active}`
                                : `${styles.status} ${styles.inactive}`
                            }
                          >
                            {product.active ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <Pencil
                              className={`${styles.icon}`}
                              onClick={() => selectProduct(product)}
                            />
                            <Eye
                              className={`${styles.icon}`}
                              onClick={() =>
                                navigate(`/admin/products/${product._id}`)
                              }
                            />
                            <Trash
                              className={`${styles.icon} red`}
                              onClick={() => setProductToDelete(product._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ProductForm
            product={selectedProduct}
            onSuccess={() => {
              loadProducts();
              setIsModalOpen(false);
            }}
          />
        </FormModal>
      )}

      <ConfirmModal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar producto?"
        message="¿Estás seguro de que deseas eliminar este producto?"
      />

      <FloatingButton
        icon={CircleFadingPlus}
        onClick={handleCreateClick}
        title="Crear Producto"
      />
    </div>
  );
}

export default Products;
