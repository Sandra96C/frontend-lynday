import { getProfileDb } from "../services/auth.service";
import { redirect } from "react-router-dom";

export const requiredAuth = async () => {
  try {
    await getProfileDb();
  } catch (error) {
    if (error.status == 401) {
      localStorage.removeItem("token");
    }
    return redirect("/admin");
  }
};

export const requiredAdminAuth = async () => {
  try {
    const profile = await getProfileDb();
    if (profile.role !== "admin") {
      return redirect("/admin");
    }
  } catch (error) {
    return redirect("/admin");
  }
};
