import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { actions } from "./mainActions/mainActions";

export const runProgram = async () => {
  const rl = readline.createInterface({ input, output, terminal: false });
  const answer = await rl.question(
    `Hello and welcome, what would you like to do (${actions.map(
      (a) => ` ${a.action} `
    )})? `.blue
  );

  for (const action of actions) {
    if (action.action === answer) {
      return action.runFn();
    }
  }

  console.error(
    `Must choose ${actions.map((a) => ` or '${a.action}' `)} please try again!`
      .red
  );

  await runProgram();
};

runProgram();
