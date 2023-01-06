import colors from "colors";
import { checkLength } from "./lengthValidation";

export const isTypeNumber = (value: string, length: number) => {
  try {
    if (isNaN(Number(value))) {
      return console.error(colors.red("The answer must be of type 'number'"));
    }

    const newValue = checkLength(value, length);
    if (newValue) {
      return newValue;
    }
  } catch (err) {
    console.error("The value passed must be a number".yellow, `${err}`.red);
  }
};
