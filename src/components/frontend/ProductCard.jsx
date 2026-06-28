import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

import placeholderProduct from "../../assets/images/placeholder-product.png";

function ProductCard({ product }) {
  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Link
      to={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0] || placeholderProduct}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        />

        {product.category && (
          <span className={`${styles.badge} ${styles.categoryBadge}`}>
            {product.categories?.length && product.categories[0].name
              ? product.categories.map((c) => c.name).join(", ")
              : "Sin categoría"}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-medium leading-snug text-foreground">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <p className="mt-3 text-lg font-semibold tabular-nums text-foreground">
          {currency.format(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
