import styles from "./RecordingPage.module.scss";

export const RecordingComp = () => {
  return (
    <div className="flex space-x-[3px] mt-[130px] items-center h-[132px]">
      <div
        className={`${styles.circle_default} ${styles.circle_recording} ${styles.circle_animation1}`}
      ></div>
      <div
        className={`${styles.circle_default} ${styles.circle_recording} ${styles.circle_animation2}`}
      ></div>
      <div
        className={`${styles.circle_default} ${styles.circle_recording} ${styles.circle_animation3}`}
      ></div>
      <div
        className={`${styles.circle_default} ${styles.circle_recording} ${styles.circle_animation4}`}
      ></div>
    </div>
  );
};
