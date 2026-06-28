import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Plus } from "lucide-react";
import styles from "./ProductDetail.module.css";
import { useProduct } from "../../hooks/useProduct";
import placeholderProduct from "../../assets/images/placeholder-product.png";
import ProductForm from "./forms/ProductForm";
import ImageForm from "./forms/ImageForm";
import FormModal from "../../shared/FormModal";

function ProductDetail() {
  const [activeImage, setActiveImage] = useState(0);

  const { slug } = useParams();
  // const navigate = useNavigate();
  const { product, loading, error, loadProduct } = useProduct({ slug });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalImage, setIsOpenModalImage] = useState(false);

  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  const dateFormat = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const stockLabel =
    (product && !product.stock) || (product?.stock && product?.stock == 0)
      ? "Sin stock"
      : `${product?.stock} ${product?.stock === 1 ? "unidad" : "unidades"}`;

  const formatDate = (value) => dateFormat.format(new Date(value));

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  if (loading) {
    return <p className="message">Cargando producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return (
      <section className="product-detail">
        <h2>Producto no encontrado</h2>
        <Link to="/">Volver</Link>
      </section>
    );
  }

  return (
    <div>
      <div className={styles.actions}>
        <Link to="/admin/products" className={styles.backButton}>
          <ArrowLeft size={16} />
          Volver a productos{" "}
        </Link>

        <button
          className={styles.editButton}
          onClick={() => setIsModalOpen(true)}
        >
          <Pencil size={16} />
          Editar producto
        </button>
      </div>
      <div className={styles.container}>
        <div>
          <div className={styles.imageCard}>
            <img
              src={product.images?.[activeImage] || placeholderProduct}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>

          <div className={styles.divThumbnails}>
            <div className={styles.thumbnails}>
              {product.images?.length >= 1 &&
                product.images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    className={`${styles.thumbnail} ${
                      index === activeImage ? styles.thumbnailActive : ""
                    }`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
            </div>
            <button
              className={`${styles.editButton} absolute top-1 right-1`}
              onClick={() => setIsOpenModalImage(true)}
            >
              {product.images?.length > 0 ? (
                <Pencil size={16} alt="Edita las imagenes" />
              ) : (
                <Plus size={16} alt="Sube las imagenes" />
              )}
            </button>
          </div>
        </div>

        <div>
          <div className={styles.badges}>
            <span className={`${styles.badge} ${styles[product.level]}`}>
              {product.level}
            </span>

            <span className={`${styles.badge} ${styles.categoryBadge}`}>
              {product.categories?.length && product.categories[0].name
                ? product.categories.map((c) => c.name).join(", ")
                : "Sin categoría"}
            </span>

            <span
              className={
                product.active
                  ? `${styles.status} ${styles.active}`
                  : `${styles.status} ${styles.inactive}`
              }
            >
              {product.active ? "Activo" : "Inactivo"}
            </span>
          </div>

          <h1 className={styles.title}>
            {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
          </h1>
          <p className={styles.slug}>/{product.slug}</p>
          <p className={styles.price}>{currency.format(product.price)}</p>
          <p className={styles.description}>{product.description}</p>
          <hr className={styles.separator} />
          <div className={styles.infoGrid}>
            <div>
              <span className={styles.label}>Stock</span>
              <p
                className={
                  product.stock === 0 ? styles.outOfStock : styles.value
                }
              >
                {stockLabel}
              </p>
            </div>

            <div>
              <span className={styles.label}>Identificador</span>
              <p className={styles.value}>{product._id}</p>
            </div>

            <div>
              <span className={styles.label}>Creado</span>
              <p className={styles.value}>{formatDate(product.createdAt)}</p>
            </div>

            <div>
              <span className={styles.label}>Actualizado</span>
              <p className={styles.value}>{formatDate(product.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ProductForm
            product={product}
            onSuccess={() => {
              setIsModalOpen(false);
              loadProduct();
            }}
          />
        </FormModal>
      )}
      {isOpenModalImage && (
        <FormModal
          isOpen={isOpenModalImage}
          onClose={() => setIsOpenModalImage(false)}
          size="lg"
        >
          <ImageForm
            product={product}
            loadProduct={loadProduct}
            onSuccess={() => {
              setIsOpenModalImage(false);
            }}
          />
        </FormModal>
      )}
    </div>
  );
}

export default ProductDetail;
