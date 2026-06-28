import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useProducts = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loadProducts,
    error,
    setError,
    loadingProducts,
  };
};
