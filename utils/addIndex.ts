import { FileHandle, open } from "node:fs/promises";
import { addIndexToDisk } from "./addIndexToDisk";
import { addSingleToMap, usersMap } from "./addIndexToMemory";

const countLines = async (fd: FileHandle) => {
  let numberOfLines = 0;

  for await (const line of fd.readLines()) {
    numberOfLines++;
  }

  return numberOfLines - 1;
};

export const addIndex = async (key: string) => {
  const dataFd = await open("./files/users.txt", "r");
  const numberOfLines = await countLines(dataFd);
  await addIndexToDisk(key, numberOfLines);
  await addSingleToMap(usersMap, key, numberOfLines);
};
