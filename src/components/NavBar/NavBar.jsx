import styles from "./NavBar.module.scss";
import { ArrowSvg, TaskSvg } from "./NavBarSvg";

export function NavBar() {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBar__logo_container}>
        <TaskSvg />
        <h6 className={styles.navBar__small_title}>To-Do</h6>
      </div>
      <div className={styles.navBar__main_container}>
        <h1 className={styles.navBar__title}>Tasks</h1>
        <div className={styles.navBar__user_container}>
          <p className={styles.navBar__user_name}>Leanne Graham</p>
          <img
            className={styles.navBar__img}
            src="./images/avatar.png"
            alt="user avatar"
          />
          <ArrowSvg />
        </div>
      </div>
    </div>
  );
}
