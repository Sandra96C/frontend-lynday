import { useEffect, useState } from "react";
import { getProfileDb } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState({ name: "Usuario" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfileDb();
        setUser(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Bienvenido, {user.name.charAt(0).toUpperCase() + user.name.slice(1)} =)
      </h1>
    </div>
  );
}

export default Home;
