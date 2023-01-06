import colors from "colors";
import { checkLength } from "./lengthValidation";

export const isTypeArray = (value: string, length: number) => {
  try {
    const isArr = Array.isArray(JSON.parse(value));

    if (!isArr || !JSON.parse(value).length) {
      return console.error(
        colors.red(
          "The answer must be of type 'Array' and to array cant be empty! []"
        )
      );
    }
    const newValue = checkLength(value, length);
    if (newValue) {
      return newValue;
    }
  } catch (err) {
    console.error(
      "The value passed must be a valid 'Array'".yellow,
      `${err}`.red
    );
  }
};
