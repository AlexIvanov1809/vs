import React from "react";
import styles from "./Scale.module.css";

const Scale = ({ value, name }) => {
  return (
    <div>
      <span>{name}</span>
      <div className={styles.scale}>
        <div
          className={styles.scale_inside}
          style={{ width: value * 10 + "%" }}
        ></div>
      </div>
    </div>
  );
};

export default Scale;
