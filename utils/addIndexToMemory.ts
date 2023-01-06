import { FileHandle, open } from "fs/promises";
import { deletedMap } from "../smallActions/deleteUserHandle";

export const usersMap = new Map();

export const AddAllToMap = async (fd: FileHandle, map: Map<string, string>) => {
  for await (const line of fd.readLines()) {
    const [key, value] = line.split(":");
    map.set(key, value);
  }
  console.log(map);
};

export const addSingleToMap = async (
  map: Map<string, number>,
  key: string,
  value: number
) => {
  map.set(key, value);
};

const onAppRun = async () => {
  const usersFd = await open("./files/idIndex.txt");
  const deletedFd = await open("./files/deletedIndex.txt");

  await AddAllToMap(usersFd, usersMap);
  await AddAllToMap(deletedFd, deletedMap);
};

onAppRun();
