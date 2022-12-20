import colors from "colors";

const isTypeNumber = (value: string, length: number) => {
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

const isTypeObject = (value: string, length: number, keys: string[] | null) => {
  try {
    const isObj = JSON.parse(value);
    const isArr: boolean = Array.isArray(isObj);

    if (typeof isObj !== "object" || isArr) {
      return console.error(`The answer must be of type 'object'`.red);
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

const isTypeArray = (value: string, length: number) => {
  try {
    const isArr = Array.isArray(JSON.parse(value));

    if (!isArr || !JSON.parse(value).length) {
      return console.error(
        "The answer must be of type 'Array' and to array cant be empty! []".red
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

const checkLength = (value: string, length: number) => {
  if (!value) {
    return;
  }
  if (value.length > length) {
    console.error(`The value cant be more then ${length} CHARACTERS long!`.red);
    return;
  }

  if (value.length < length) {
    value = value.padEnd(length);
  }

  return value;
};

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
