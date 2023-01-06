import { FileHandle, open } from "fs/promises";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { layout } from "./layout";

export const handleSearchAction = async (
  action: string,
  index: string
): Promise<void> => {
  const dataFd = await open("./files/users.txt", "r");

  if (action === "all") {
    await handleAll(dataFd, index);
  }

  if (action === "filed") {
    await handleFiled(dataFd, index);
  }
};

const handleAll = async (fd: FileHandle, index: string) => {
  const buf = Buffer.alloc(280);
  await fd.read(buf, 0, 280, Number(index) * 280);

  const resStr = buf.toString("utf-8");

  for (const item of resStr.split("|")) {
    console.log(`${item.trimEnd()}`.green);
  }
  return;
};

const handleFiled = async (fd: FileHandle, index: string) => {
  const rl = readline.createInterface({ input, output, terminal: false });

  let field: string = await rl.question(
    "What is the filed of the user that u want to get ? ".yellow
  );

  while (!(field in layout)) {
    field = await rl.question(
      "The searched filed must be one of these: ('firstName' | 'lastName' | 'username' | 'age' | 'emails' | 'address' | 'phone' | 'website' | 'hobbies') ? "
        .red
    );
  }

  const buf = Buffer.alloc(layout[field].length);
  await fd.read(
    buf,
    0,
    layout[field].length,
    Number(index) * 280 + layout[field].start
  );

  console.log(buf.toString("utf-8").green);
  return;
};
