import { TriangleAlert } from "lucide-react";
import styles from "./ErrorDiv.module.css";

function ErrorDiv({ messageError }) {
  return (
    <>
      <div className={styles.errorBox}>
        <TriangleAlert className={styles.errorIcon} />
        <div>
          <p className={styles.errorTitle}>Error</p>
          <p className={styles.errorMessage}>
            {messageError ? messageError : "Error"}
          </p>
        </div>
      </div>
    </>
  );
}

export default ErrorDiv;
