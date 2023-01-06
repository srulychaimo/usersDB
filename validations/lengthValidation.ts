import colors from "colors";

export const checkLength = (value: string, length: number) => {
  if (!value) {
    return;
  }
  if (value.length > length) {
    console.error(
      colors.red(`The value cant be more then ${length} CHARACTERS long!`)
    );
    return;
  }

  if (value.length < length) {
    value = value.padEnd(length);
  }

  return value;
};
