import { useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import CategoryForm from "./forms/CategoryForm";
import FloatingButton from "../../shared/FloatingButton";
import { CircleFadingPlus } from "lucide-react";
import Table from "../../shared/Table";
import styles from "./Users.module.css";
import FormModal from "../../shared/FormModal";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCategory } from "../../services/category.service";
import ConfirmModal from "../../shared/ConfirmModal";

function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories, loadCategories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const columns = [
    { header: "Nombre", render: (category) => category.name },
    { header: "Descripcion", render: (category) => category.description },
  ];

  const actions = (category) => {
    return (
      <div className={styles.actions}>
        <Pencil
          className={`${styles.icon}`}
          onClick={() => selectCategory(category)}
        />
        <Trash2
          className={`${styles.icon} red`}
          onClick={() => setCategoryToDelete(category._id)}
        />
      </div>
    );
  };

  const selectCategory = (category) => {
    setIsModalOpen(true);
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const handleCreateClick = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    loadCategories();
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      console.log("Delete category with ID:", categoryToDelete);
      await deleteCategory(categoryToDelete);
      loadCategories();
    } catch (error) {
      console.error("Error al borrar categoria:", error);
    } finally {
      setCategoryToDelete(null);
    }
  };

  return (
    <>
      <div>
        <h2 className="mr-15 mb-10 text-2xl font-bold">Categorías</h2>
        <p>Crea, edita o elimina las categorías de tus productos.</p>
      </div>
      <div>
        {categories.length === 0 ? (
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            <li className="p-6 text-center text-sm text-muted-foreground">
              No hay categorías. Crea la primera arriba.
            </li>
          </ul>
        ) : (
          <>
            <section className={styles.table}>
              <Table
                Table
                columns={columns}
                data={categories}
                actions={actions}
              />
            </section>
          </>
        )}
        {isModalOpen && (
          <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <CategoryForm
              category={selectedCategory}
              onSuccess={() => {
                loadCategories();
                handleFormSuccess();
              }}
            />
          </FormModal>
        )}

        <FloatingButton
          icon={CircleFadingPlus}
          onClick={handleCreateClick}
          title="Crear categoría"
        />

        <ConfirmModal
          isOpen={Boolean(categoryToDelete)}
          onClose={() => setCategoryToDelete(null)}
          onConfirm={handleConfirmDelete}
          title="¿Eliminar categoría?"
          message="¿Estás seguro de que deseas eliminar esta categoría?"
        />
      </div>
    </>
  );
}

export default Categories;
