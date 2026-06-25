import { useEffect, useState } from "react";
import { getCategories } from "../services/category.service.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useCategory = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loadCategories,
  };
};
