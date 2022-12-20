import { v4 as uuidv4 } from "uuid";
import colors from "colors";
import * as readline from "node:readline/promises";
import { open } from "node:fs/promises";
import { stdin as input, stdout as output } from "node:process";
import { questions } from "./data.js";
import { validateType } from "./typeValidations.js";
import { addIndex, handleAction } from "./utils.js";

const addUserWithArr = async () => {
  try {
    const fd = await open("./users.txt", "a+");

    const rl = readline.createInterface({ input, output, terminal: false });

    const answers: string[] = [];
    const id: string = uuidv4();

    for (const query of questions) {
      let answer = await rl
        .question(colors.green(`${query.question} `))
        .then((data) =>
          validateType(
            query.type,
            data,
            query.length,
            query.keys ? query.keys : null
          )
        );

      while (!answer) {
        answer = await rl
          .question(`${query.question} `.green)
          .then((data) =>
            validateType(
              query.type,
              data,
              query.length,
              query.keys ? query.keys : null
            )
          );
      }

      answers.push(answer);
    }

    const writeStream = fd.createWriteStream();

    writeStream.write(`${id}|`);

    for (const answer of answers) {
      writeStream.write(`${answer}|`);
    }

    writeStream.write(`\n`);

    await addIndex(id);

    console.log(`User with id: ${id} was added successfully!!!`.bgGreen);

    await runProgram();
    rl.close();
  } catch (err) {
    console.error(err);
  }
};

const searchUserById = async () => {
  try {
    const idIndexFd = await open("./idIndex.txt", "r");

    const rl = readline.createInterface({ input, output, terminal: false });

    const searchId: string = await rl.question(
      "Whats the user id of the user your looking for ? ".yellow
    );

    let index: string[] = [];

    for await (const line of idIndexFd.readLines()) {
      if (line.includes(searchId)) {
        index = line.split(":");
      }
    }

    let action: string = await rl.question(
      "What do you want to get ('all' | 'filed') ? ".yellow
    );

    while (!action || (action !== "all" && action !== "filed")) {
      action = await rl.question(
        "What do you want to get ('all' | 'filed') ? ".yellow
      );
    }

    await handleAction(action, index);

    if (!index.length) {
      console.error(
        `cannot find a user with the id: ${searchId}, please try again!`.red
      );
    }

    runProgram();
    rl.close();
  } catch (err) {
    console.error(err);
  }
};

const runProgram = async () => {
  const rl = readline.createInterface({ input, output, terminal: false });
  const action = await rl.question(
    "Hello and welcome, what would you like to do (add || search)? ".blue
  );

  if (action === "add") {
    return addUserWithArr();
  }

  if (action === "search") {
    return searchUserById();
  }

  console.error("Must choose or 'add' or 'search', please try again!".red);

  runProgram();
  rl.close();
};

runProgram();
