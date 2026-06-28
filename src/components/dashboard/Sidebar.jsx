import { LayoutDashboard, Package, Users, Tags } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import logo from "../../assets/logo-lynday.jpg";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { href: "/admin", label: "Inicio", icon: LayoutDashboard },
  // { href: "/admin/orders", label: "Pedidos", icon: ShoppingBag },
  { href: "/admin/categories", label: "Categorias", icon: Tags },
  { href: "/admin/products", label: "Productos", icon: Package },
  { href: "/admin/users", label: "Usuarios", icon: Users },
];

function DashboardSidebar() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <img src={logo} alt="Lynday Regalos" className={styles.sidebarLogo} />
        <div className={styles.name}>
          <p className={styles.headerTitle}>Lynday Regalos</p>
          <p className={styles.headerText}>Panel de gestión</p>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={
                active ? styles["sidebarLink--active"] : styles.sidebarLink
              }
            >
              <Icon className={styles.icon} />
              <span className={styles.name}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <Link onClick={handleLogout}>Cerrar sesión</Link>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
