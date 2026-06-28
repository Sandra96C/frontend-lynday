import Navbar from "./Navbar";
import ProductCard from "./ProductCard.jsx";
import { useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCategory } from "../../hooks/useCategory";
import LoadingPage from "../../shared/LoadingPage";

function HomeFrontend() {
  const { categories, loadingCategories: loading } = useCategory();
  const { products, loadingProducts: loadingProducts } = useProducts();
  const sections = categories
    .map((category) => ({
      name: category.name,
      items: products.filter((product) =>
        product.categories.some((cat) => cat.name === category.name),
      ),
    }))
    .filter((section) => section.items.length > 0);

  const { uncategorized } = useMemo(() => {
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

  if (loadingProducts || loading) {
    return <LoadingPage />;
  }
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Productos sin categoría */}
        {uncategorized.length > 0 && (
          <section className="mb-14">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Destacados
              </h2>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {uncategorized.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Productos por categoría */}
        {sections.map((section) => (
          <section
            key={section.name}
            id={section.slug}
            className="mb-14 scroll-mt-24"
          >
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                {section.name}
              </h2>
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {section.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default HomeFrontend;
