import colors from "colors";
import { open } from "fs/promises";
import { runProgram } from "..";

export const deletedMap = new Map();

export const checkIfDeleted = (id: string) => {
  if (deletedMap.has(id)) {
    return true;
  }
};

export const handleDelete = async (id: string, index: string) => {
  const fd = await open("./files/deletedIndex.txt", "a+");

  await fd.write(`${id}:${index}\n`);
  deletedMap.set(id, index);

  console.log(colors.bgRed("User Deleted!"));

  await runProgram();
};
