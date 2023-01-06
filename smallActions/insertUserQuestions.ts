import colors from "colors";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { questions } from "../utils/dataQuestions";
import { validateType } from "../validations/mainValidation";
import { Question } from "../interfaces/question";

const askQuestionAndValidate = async (query: Question) => {
  const rl = readline.createInterface({ input, output, terminal: false });

  return await rl
    .question(colors.green(`${query.question} `))
    .then((data) =>
      validateType(
        query.type,
        data,
        query.length,
        query.keys ? query.keys : null
      )
    );
};

export const userInput = async () => {
  const answers: string[] = [];

  for (const query of questions) {
    let answer = await askQuestionAndValidate(query);

    while (!answer) {
      answer = await askQuestionAndValidate(query);
    }

    answers.push(answer);
  }

  return answers;
};
