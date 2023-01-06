import colors from "colors";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { handleSearchAction } from "../utils/handleSearchAction";

export const searchUserIndex = async (id: string, map: Map<string, string>) => {
  const index = map.get(id.trim());

  if (index) {
    return index;
  }

  console.error(
    colors.red(`cannot find a user with the id: ${id}, please try again!`)
  );
};

export const handleAction = async (index: string) => {
  const rl = readline.createInterface({ input, output, terminal: false });

  let action: string = await rl.question(
    "What do you want to get ('all' | 'filed') ? ".yellow
  );

  while (!action || (action !== "all" && action !== "filed")) {
    action = await rl.question(
      "What do you want to get ('all' | 'filed') ? ".yellow
    );
  }

  await handleSearchAction(action, index);
};
