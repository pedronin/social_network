import React, { type ChangeEvent, forwardRef } from "react";

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string
  style?: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ style, placeholder, ...rest }, ref) => {
    return (
      <>
        <input
          ref={ref}
          className={`bg-[#3d444b] py-1 px-3 focus:outline-none focus:border-none ${style || ""}`}
          placeholder={placeholder}
          type="text"
          {...rest}
        />
      </>
    );
  }
);

export default Input;
