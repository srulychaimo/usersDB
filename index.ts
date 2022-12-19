import { v4 as uuidv4 } from "uuid";
import colors from "colors";
import * as readline from "node:readline/promises";
import { open } from "node:fs/promises";
import { stdin as input, stdout as output } from "node:process";
import { questions } from "./data.js";
import {
  isTypeArray,
  isTypeNumber,
  isTypeObject,
  checkLength,
} from "./typeValidations.js";
import { addIndex } from "./utils.js";

const addUserWithArr = async () => {
  try {
    const fd = await open("./users2.txt", "a+");

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
    const dataFd = await open("./users2.txt", "r");
    const idIndexFd = await open("./idIndex.txt", "a+");

    const rl = readline.createInterface({ input, output, terminal: false });
    const searchId: string = await rl.question(
      "Whats the user id of the user your looking for? ".yellow
    );

    let index: string[] | string = [];

    for await (const line of idIndexFd.readLines()) {
      if (line.includes(searchId)) {
        index = line.split(":");
      }
    }

    const buf = Buffer.alloc(211);
    await dataFd.read(buf, 0, 211, Number(index[1]) * 211);

    console.log(buf.toString("utf-8"));

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

const validateType = (
  type: string,
  value: string,
  length: number,
  keys: string[] | null
) => {
  switch (type) {
    case "string":
      return checkLength(value, length);

    case "number":
      return isTypeNumber(value, length);

    case "array":
      return isTypeArray(value, length);

    case "object":
      return isTypeObject(value, length, keys);

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
  rl.close();
};

runProgram();
