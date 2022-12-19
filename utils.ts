import { FileHandle, open } from "fs/promises";

export const countLines = async (fd: FileHandle) => {
  let numberOfLines = 0;

  for await (const line of fd.readLines()) {
    numberOfLines++;
  }

  return numberOfLines - 1;
};

export const addIndex = async (id: string) => {
  try {
    const dataFd = await open("./users2.txt", "r");
    const idIndexFd = await open("./idIndex.txt", "a+");
    const stat = await countLines(dataFd);

    await idIndexFd.write(`${id}:${stat}\n`, 0);
  } catch (err) {
    console.error(`${err}`.red);
  }
};
