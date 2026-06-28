import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import styles from "./ProductCard.module.css";
import { useProduct } from "../../hooks/useProduct";
import placeholderProduct from "../../assets/images/placeholder-product.png";
import LoadingPage from "../../shared/LoadingPage";

function ProductDetailFrontend() {
  const [activeImage, setActiveImage] = useState(0);

  const { slug } = useParams();
  // const navigate = useNavigate();
  const { product, loading, loadProduct } = useProduct({ slug });

  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  useEffect(() => {
    loadProduct();
  }, [slug]);

  if (loading) {
    return <LoadingPage />;
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
        <Link to="/" className={styles.backButton}>
          <ArrowLeft size={16} />
          Volver a productos
        </Link>
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
          </div>

          <h1 className={styles.title}>
            {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
          </h1>
          <p className={styles.price}>{currency.format(product.price)}</p>
          <p className={styles.description}>{product.description}</p>
          <hr className={styles.separator} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailFrontend;
