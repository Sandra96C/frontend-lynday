import { useEffect, useState } from "react";
import { getProductById } from "../services/product.service.js";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProduct = async () => {
    try {
      if (id) {
        const data = await getProductById(id);
        setProduct(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProduct();
  }, [id]);

  return {
    product,
    loading,
    loadProduct,
    error,
    setError,
  };
};
