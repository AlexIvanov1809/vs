import React from "react";
import styles from "./Button.module.css";
import cn from "classnames";
import { icons } from "../../../assets/icons";

const Button = ({ appearance, type, children, icon, className, ...props }) => {
  const btnStyle = cn(styles.button, className, {
    [styles.primary]: appearance == "primary",
    [styles.danger]: appearance == "danger",
  });

  const IconComponent = icons[icon];
  return (
    <button {...props} type={type} className={btnStyle}>
      {children ? children : <IconComponent />}
    </button>
  );
};

export default Button;
