import { useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import CategoryForm from "./forms/CategoryForm";
import FloatingButton from "../../shared/FloatingButton";
import { CircleFadingPlus } from "lucide-react";
import styles from "./Products.module.css";
import FormModal from "../../shared/FormModal";

function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories, loadCategories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectCategory = (category) => {
    setIsModalOpen(true);
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    loadCategories();
    setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <h2 className="mr-15 mb-10 text-2xl font-bold">Categorias</h2>
      </div>
      <div>
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {categories.length === 0 && (
            <li className="p-6 text-center text-sm text-muted-foreground">
              No hay categorías. Crea la primera arriba.
            </li>
          )}
          {categories.map((category) => {
            return (
              <>
                <li key={category.id} className="flex items-center gap-3 p-4">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {category.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {/* {countProducts(category.name)} producto(s) */}
                    </p>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
        {isModalOpen && (
          <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <CategoryForm
              category={selectedCategory}
              onSuccess={handleFormSuccess}
            />
          </FormModal>
        )}
        <FloatingButton
          icon={CircleFadingPlus}
          onClick={handleCreateClick}
          title="Crear Usuario"
        />
      </div>
    </>
  );
}

export default Categories;
