import { open } from "node:fs/promises";

export const addIndexToDisk = async (id: string, index: number) => {
  try {
    const idIndexFd = await open("./files/idIndex.txt", "a+");
    await idIndexFd.write(`${id}:${index}\n`);
  } catch (err) {
    console.error(`${err}`.red);
  }
};
