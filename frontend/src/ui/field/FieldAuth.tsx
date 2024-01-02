import React, { forwardRef } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import styles from "./Form.module.scss";

const placeholders = {
  email: "E-Mail",
  fullName: "Имя",
  password: "Пороль",
};

interface FieldAuthProps {
  // errorMessage?: String;
  nameInput: "fullName" | "email" | "password";
  placeholder: string;
  error?: FieldError;
  className?: string
}


export const FieldAuth = forwardRef<HTMLInputElement, FieldAuthProps>(
  ({ error, nameInput, placeholder, ...rest }, ref) => {
    return (
      <>
        {error && <span className={styles.invalid_field}>{error.message}</span>}
        <div className={styles.form__row}>
          <input
            ref={ref}
            className={styles.form__input}
            {...rest}
            // required
          />
          <label className={styles.form__label}>
            {placeholder && placeholder}
          </label>
        </div>
      </>
    );
  }
);
