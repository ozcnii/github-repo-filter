import axios from "axios";
import { useMemo } from "react";

export const useErrorMessage = (error: unknown) => {
  return useMemo(() => {
    if (axios.isAxiosError(error)) {
      const { message } = error.response?.data as { message: string };
      return message;
    }
    if (error instanceof Error) return error.message;
    return "Some error";
  }, [error]);
};
