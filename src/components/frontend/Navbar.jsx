import logo from "../../assets/logo-lynday.jpg";
import styles from "../dashboard/Sidebar.module.css";
import { Link } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";

function Navbar() {
  // const { categories } = useCategory();
  return (
    <div className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl justify-between gap-6 px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <img src={logo} alt="Lynday Regalos" className={styles.sidebarLogo} />
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Lynday Regalos
          </span>
        </Link>
        {/* <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Inicio
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/#${category?.slug}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {category.name}
            </Link>
          ))}
        </nav> */}
      </div>
    </div>
  );
}

export default Navbar;
