import { getProfileDb } from "../services/auth.service";
import { redirect } from "react-router-dom";

export const requiredAuth = async () => {
  try {
    await getProfileDb();
  } catch (error) {
    if (error.status == 401) {
      localStorage.removeItem("token");
    }
    return redirect("/login");
  }
};
