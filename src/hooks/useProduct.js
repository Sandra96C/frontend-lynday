import { useEffect, useState } from "react";
import { getProductById } from "../services/product.service.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      console.log(id);
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

    loadProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
    setError,
  };
};
