import colors from "colors";
const isTypeNumber = (value, length) => {
    try {
        if (isNaN(Number(value))) {
            return console.error(colors.red("The answer must be of type 'number'"));
        }
        const newValue = checkLength(value, length);
        if (newValue) {
            return newValue;
        }
    }
    catch (err) {
        console.error("The value passed must be a number".yellow, `${err}`.red);
    }
};
const isTypeObject = (value, length, keys) => {
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
                errorKeys.map((key) => console.error(`The key '${key}' must be added to the object`.red));
                return;
            }
        }
        const newValue = checkLength(value, length);
        if (newValue) {
            return newValue;
        }
    }
    catch (err) {
        console.error("The value passed must be a valid JSON object".yellow, `${err}`.red);
    }
};
const isTypeArray = (value, length) => {
    try {
        const isArr = Array.isArray(JSON.parse(value));
        if (!isArr || !JSON.parse(value).length) {
            return console.error("The answer must be of type 'Array' and to array cant be empty! []".red);
        }
        const newValue = checkLength(value, length);
        if (newValue) {
            return newValue;
        }
    }
    catch (err) {
        console.error("The value passed must be a valid 'Array'".yellow, `${err}`.red);
    }
};
const checkLength = (value, length) => {
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
export const validateType = (type, value, length, keys) => {
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
