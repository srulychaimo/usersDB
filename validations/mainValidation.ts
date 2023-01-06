import { isTypeArray } from "./arrayValidation";
import { checkLength } from "./lengthValidation";
import { isTypeNumber } from "./numberValidation";
import { isTypeObject } from "./objectValidation";

export const validateType = (
  type: string,
  value: string,
  length: number,
  keys: string[] | null
) => {
  switch (type) {
    case "string":
      return checkLength(value, length);

    case "number":
      return isTypeNumber(value, length);

    case "array":
      return isTypeArray(value, length);

    case "object":
      return isTypeObject(value, length, keys);

    default:
      break;
  }
};
