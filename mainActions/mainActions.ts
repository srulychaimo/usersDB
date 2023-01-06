import { exit } from "process";
import { Action } from "../interfaces/actions";
import { deleteUser } from "./deleteUser";
import { insertUser } from "./insertUser";
import { searchUser } from "./searchUser";

export const actions: Action[] = [
  {
    action: "add",
    runFn: insertUser,
  },
  {
    action: "search",
    runFn: searchUser,
  },
  {
    action: "delete",
    runFn: deleteUser,
  },
  {
    action: "exit",
    runFn: exit,
  },
];
