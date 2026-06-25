import { useEffect, useState } from "react";
import styles from "./form.module.css";
import { Trash } from "lucide-react";

function ImageForm({ product }) {
  const [formData, setFormData] = useState({
    images: product?.images || null,
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lynday");
    formData.append("folder", `lynday/products/${product.id}`);

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

  useEffect(() => {}, []);

  return (
    <div>
      <div className="field">
        <label htmlFor="images">Imagenes</label>
        <input
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
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageForm;
