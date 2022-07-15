import { colors, emptyColor } from "../constants/colors";

export const getLanguageColor = (color: string) => {
  return colors[color] ?? emptyColor;
};
