import { useEffect, useState } from "react";
import {
  getProductById,
  getProductBySlug,
} from "../services/product.service.js";

export const useProduct = ({ id, slug }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      let data;

      if (id) {
        data = await getProductById(id);
      } else if (slug) {
        data = await getProductBySlug(slug);
      } else {
        throw new Error("Debe proporcionarse un id o un slug");
      }

      setProduct(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id, slug]);

  return {
    product,
    loading,
    error,
    loadProduct,
  };
};
