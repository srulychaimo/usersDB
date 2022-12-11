import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { open } from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
import colors from "colors";
import { questions } from "./data.js";
import { isTypeArray, isTypeNumber, isTypeObject } from "./typeValidatins.js";

const addUserWithArr = async () => {
  try {
    const fd = await open("./users.txt", "a+");

    const rl = readline.createInterface({ input, output, terminal: false });

    const answers = [];
    const id = uuidv4();

    for (const query of questions) {
      let answer = await rl
        .question(`${query.question} `.green)
        .then((data) =>
          validateType(query.type, data, query.keys ? query.keys : "")
        );

      while (!answer) {
        answer = await rl
          .question(`${query.question} `.green)
          .then((data) =>
            validateType(query.type, data, query.keys ? query.keys : "")
          );
      }

      if (answer) {
        answers.push({ key: query.key, answer });
      }
    }

    await fd.appendFile(`id: ${id} | `);
    for (const answer of answers) {
      await fd.appendFile(`${answer.key}: ${answer.answer} | `);
    }

    await fd
      .appendFile(`\n ---------- \n`)
      .then(
        console.log(`User with id: ${id} was added successfully!!!`.bgGreen)
      );

    await runProgram();
    rl.close();
  } catch (err) {
    console.error(err);
  }
};

const searchUserById = async () => {
  try {
    const rl = readline.createInterface({ input, output, terminal: false });
    const fd = await open("./users.txt", "a+");
    const searchId = await rl.question(
      "Whats the user id of the user your looking for? ".yellow
    );

    let userInfo = "";

    for await (const line of fd.readLines()) {
      if (line.includes(`id: ${searchId}`)) {
        userInfo = line.split("|");
        for (const info of userInfo) {
          console.log(info.trimStart().bgGreen);
        }
      }
    }

    if (!userInfo) {
      console.error(
        `cannot find a user with the id: ${searchId}, please try again!`.red
      );
    }

    runProgram();
  } catch (err) {
    console.error(err);
  }
};

const validateType = (type, value, keys) => {
  switch (type) {
    case "string":
      return value;

    case "number":
      return isTypeNumber(value);

    case "array":
      return isTypeArray(value);

    case "object":
      return isTypeObject(value, keys);

    default:
      break;
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
};

runProgram();
