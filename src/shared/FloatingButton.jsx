import React from "react";
import styles from "./FloatingButton.module.css";

function FloatingButton({ icon: Icon, onClick, title = "Añadir" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      alt={title}
      aria-label={title}
      className={`${styles.floatingMenu} rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95 cursor-pointer`}
    >
      {Icon && <Icon className="h-6 w-6" />}
    </button>
  );
}

export default FloatingButton;
