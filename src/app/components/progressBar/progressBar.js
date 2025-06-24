import styles from "./progressBar.module.css";

export default function ProgressBar({ current, max, name }) {
  const percentage = (current / max) * 100;

  return (
    <div className={styles.progressWrapper}>

      <div className={styles.progressHeader}>
        <span className={styles.title}>BrainCode</span>
        <span className={styles.name}>{name}</span>
        <span className={styles.counter}>{current} / {max}</span>
      </div>
      <div className={styles.barBackground}>
        <div
          className={styles.barFill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
