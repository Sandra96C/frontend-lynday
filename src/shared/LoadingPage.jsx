import styles from "./LoadingPage.module.css";

function LoadingPage() {
  return (
    <div>
      <div className={`${styles.gift} text-center`}>🎁</div>
      <h2 className={styles.title}>Preparando tus regalos...</h2>
    </div>
  );
}

export default LoadingPage;
