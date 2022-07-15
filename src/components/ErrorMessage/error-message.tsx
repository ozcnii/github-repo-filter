import { FC } from "react";
import { ErrorMessageProps } from "./error-message.props";

export const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
  return <div className="text-center mt-3 text-red-500">{children}</div>;
};
