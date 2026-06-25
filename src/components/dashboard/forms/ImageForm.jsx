import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./form.module.css";
import { Trash, Upload } from "lucide-react";
import { updateProduct } from "../../../services/product.service";
import { useAuth } from "../../../hooks/useAuth";

function ImageForm({ product, onSuccess, loadProduct }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    images: product?.images || null,
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lynday");
    formData.append("folder", `lynday/products/${product._id}`);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/devhdnlyu/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    return data.secure_url.replace("/upload/", "/upload/f_webp,q_auto/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      await updateProduct(formData, product._id);

      if (onSuccess) {
        onSuccess();
        loadProduct();
      }
    } catch (error) {
      if (error.status == 401) {
        logout();
        navigate("/login");
        return;
      }
    }
  };

  const deleteImg = async (image) => {
    const index = formData.images.map((img, i) => {
      if (img == image) return i;
    });

    formData.images.splice(index, 1);
    setFormData({
      ...formData,
      images: [...formData.images],
    });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="field">
        <label className="mb-2" htmlFor="images">
          Editar Imagenes:
        </label>
        <label htmlFor="images" className={styles.uploadLabel}>
          <Upload size={18} />
          <span>Haz click aquí para subir imágenes</span>
        </label>
        <input
          className={`${styles.hiddenInput} mb-5`}
          type="file"
          id="images"
          name="images"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            const url = await uploadImage(file);
            setFormData({
              ...formData,
              images: [...formData.images, url],
            });
          }}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {formData.images?.map((image) => (
          <div className="relative" key={image}>
            <img
              src={image}
              alt=""
              className="w-full aspect-square object-cover rounded-lg"
            />

            <button
              className={`${styles.editButton} absolute top-2 right-2 text-white rounded-full p-1 cursor-pointer`}
              onClick={() => deleteImg(image)}
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex gap-5">
          <button type="submit" className="btn" onClick={handleSubmit}>
            Guardar
          </button>
          <button type="" className="btn">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageForm;
