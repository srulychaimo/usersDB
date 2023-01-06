import colors from "colors";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { handleAction } from "../smallActions/searchUserIndex";
import { runProgram } from "../index";
import { searchUserIndex } from "../smallActions/searchUserIndex";
import { usersMap } from "../utils/addIndexToMemory";
import { checkIfDeleted } from "../smallActions/deleteUserHandle";

export const searchUser = async () => {
  try {
    const rl = readline.createInterface({ input, output, terminal: false });

    let searchId: string = await rl.question(
      colors.yellow("Whats the user id of the user your looking for? ")
    );

    if (checkIfDeleted(searchId)) {
      console.log(
        colors.bgRed("User Was deleted, can't get the user information!")
      );
      return await runProgram();
    }

    let index = await searchUserIndex(searchId, usersMap);

    while (!index) {
      searchId = await rl.question(
        colors.yellow("Whats the user id of the user your looking for ? ")
      );

      index = await searchUserIndex(searchId, usersMap);
    }

    if (index) {
      await handleAction(index);
    }

    await runProgram();
  } catch (err) {
    console.error(err);
  }
};
