import { FC } from "react";
import { ButtonProps } from "./button.props";

export const Button: FC<ButtonProps> = ({ className, onClick, children }) => {
  return (
    <button
      className={`${className} bg-[#21262d] px-4 py-1 rounded-md hover:opacity-80 border border-[rgba(240,246,252,0.1)]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
