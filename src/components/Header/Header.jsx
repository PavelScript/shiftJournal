import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (<>
    <div className={styles.containerHeader}>
      <div className={styles.navigationSection}>
        <button className={styles.hamburgerButton}>☰</button>
        <button className={styles.zayavkiASUTP}>Заявки АСУТП </button>
        <button className={styles.forces}>Форсировки </button>
        <button className={styles.equipment}>Замечания по оборудованию </button>
      </div>
    </div>
 
    </>
  );
};

export default Header;
