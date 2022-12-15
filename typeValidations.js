import colors from "colors";

export const isTypeNumber = (value) => {
  try {
    if (isNaN(value)) {
      return console.error("The answer must be of type 'number'".red);
    }

    return value;
  } catch (err) {
    console.error("The value passed must be a number".yellow, `${err}`.red);
  }
};

export const isTypeObject = (value, keys) => {
  try {
    const isObj = JSON.parse(value);
    const isArr = Array.isArray(isObj);

    if (typeof isObj !== "object" || isArr) {
      return console.error(`The answer must be of type 'object'`.red);
    }

    if (keys && Array.isArray(keys)) {
      let errorKeys = [];
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

    return value;
  } catch (err) {
    console.error(
      "The value passed must be a valid JSON object".yellow,
      `${err}`.red
    );
  }
};

export const isTypeArray = (value) => {
  try {
    const isArr = Array.isArray(JSON.parse(value));

    if (!isArr || !JSON.parse(value).length) {
      return console.error(
        "The answer must be of type 'Array' and to array cant be empty! []".red
      );
    }

    return value;
  } catch (err) {
    console.error(
      "The value passed must be a valid 'Array'".yellow,
      `${err}`.red
    );
  }
};
