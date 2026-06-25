import { useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import CategoryForm from "./forms/CategoryForm";
import FloatingButton from "../../shared/FloatingButton";
import { CircleFadingPlus, X } from "lucide-react";
import styles from "./Products.module.css";

function Categories() {
  const { categories, loadCategories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [editingId, setEditingId] = useState(false);

  const selectCategory = (category) => {
    setCreatingCategory(false);
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const handleCreateClick = () => {
    setSelectedCategory(null);
    setCreatingCategory(true);
  };

  const handleFormSuccess = () => {
    loadCategories();
    setSelectedCategory(null);
    setCreatingCategory(false);
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
            const isEditing = editingId === category?.id;
            return (
              <li key={category.id} className="flex items-center gap-3 p-4">
                {isEditing ? (
                  <>
                    {/* <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="bg-background"
                      aria-label="Editar nombre de categoría"
                      autoFocus
                    />
                    <Button
                      size="icon"
                      onClick={saveEdit}
                      aria-label="Guardar"
                      className="shrink-0"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      // onClick={() => setEditingId(null)}
                      aria-label="Cancelar"
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button> */}
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {category.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {/* {countProducts(category.name)} producto(s) */}
                      </p>
                    </div>
                    {/* <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEdit(category)}
                      aria-label={`Editar ${category.name}`}
                      className="shrink-0"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeCategory(category.id)}
                      aria-label={`Eliminar ${category.name}`}
                      className="shrink-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button> */}
                  </>
                )}
              </li>
            );
          })}
        </ul>
        {selectedCategory || creatingCategory ? (
          <div className={styles.formDiv}>
            <span className={styles.close}>
              <X
                className={`${styles.icon} close`}
                onClick={() => {
                  setSelectedCategory(null);
                  setCreatingCategory(false);
                }}
              />
            </span>
            <CategoryForm
              category={selectedCategory}
              onSuccess={handleFormSuccess}
            />
          </div>
        ) : (
          ""
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
