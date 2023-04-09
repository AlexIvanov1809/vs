import React from "react";
import styles from "./Button.module.css";
import cn from "classnames";
import { icons } from "../../../assets/icons";

const Button = ({ appearance, type, children, icon, className, ...props }) => {
  const btnStyle = cn(styles.button, className, {
    // всегда использовать тройное равно
    [styles.primary]: appearance == "primary",
    [styles.danger]: appearance == "danger",
  });

  // а если не будет иконки?
  const IconComponent = icons[icon];
  return (
    <button {...props} type={type} className={btnStyle}>
      {/* очень нелогичное условие. Обычно иконка идет в дополнение, а не вместо контента.
       Код нужно писать, чтобы его работа была предсказуема */}
      {children ? children : <IconComponent />}
    </button>
  );
};

export default Button;
