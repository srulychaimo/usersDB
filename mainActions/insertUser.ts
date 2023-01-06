import { v4 as uuidv4 } from "uuid";

import { open } from "node:fs/promises";

import { addIndex } from "../utils/addIndex";
import { runProgram } from "../index";
import { userInput } from "../smallActions/insertUserQuestions";

export const insertUser = async () => {
  try {
    const fd = await open("./files/users.txt", "a+");

    const id: string = uuidv4();

    const answers = await userInput();

    const writeStream = fd.createWriteStream();

    writeStream.write(`${id}|`);

    for (const answer of answers) {
      writeStream.write(`${answer}|`);
    }

    writeStream.write(`\n`);

    await addIndex(id);

    console.log(`User with id: ${id} was added successfully!!!`.bgGreen);

    await runProgram();
  } catch (err) {
    console.error(err);
  }
};
