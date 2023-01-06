import colors from "colors";
import { checkLength } from "./lengthValidation";

export const isTypeObject = (
  value: string,
  length: number,
  keys: string[] | null
) => {
  try {
    const isObj = JSON.parse(value);
    const isArr: boolean = Array.isArray(isObj);

    if (typeof isObj !== "object" || isArr) {
      return console.error(colors.red("The answer must be of type 'object'"));
    }

    if (keys && Array.isArray(keys)) {
      let errorKeys: string[] = [];
      for (const key of keys) {
        if (!(key in isObj)) {
          errorKeys.push(key);
        }
      }

      if (errorKeys.length) {
        errorKeys.map((key) =>
          console.error(`The key '${key}' must be added to the object`.red)
        );
        return;
      }
    }
    const newValue = checkLength(value, length);
    if (newValue) {
      return newValue;
    }
  } catch (err) {
    console.error(
      "The value passed must be a valid JSON object".yellow,
      `${err}`.red
    );
  }
};
