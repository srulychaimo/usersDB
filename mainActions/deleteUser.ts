import colors from "colors";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { searchUserIndex } from "../smallActions/searchUserIndex";
import { handleDelete } from "../smallActions/deleteUserHandle";
import { usersMap } from "../utils/addIndexToMemory";

export const deleteUser = async () => {
  const rl = readline.createInterface({ input, output, terminal: false });

  let userId: string = await rl.question(
    colors.yellow("Whats the user id of the user that you want to delete? ")
  );

  let index = await searchUserIndex(userId, usersMap);

  while (!index) {
    userId = await rl.question(
      colors.yellow("Whats the user id of the user that you want to delete? ")
    );

    index = await searchUserIndex(userId, usersMap);
  }

  if (index) {
    await handleDelete(userId, index);
  }
};
