import fs from "fs";
import { writeToDb, readFromDb } from "./data-read-write.js";

const dbPath = "./todo-db.json";
const argument = process.argv;

const createFileIfNotExists = (flag) => {
  fs.access(dbPath, fs.constants.F_OK, (err) => {
    const data = "[]";
    if (err) {
      writeToDb(dbPath, data);
      readFromDb(dbPath, data, flag);
    } else {
      readFromDb(dbPath, data, flag);
    }
  });
};

const addFileIfNotExists = (data, flag) => {
  fs.access(dbPath, fs.constants.F_OK, async (err) => {
    if (err) {
      const obj = { todo: data, completed: false };
      const info = [obj];
      writeToDb(dbPath, JSON.stringify(info, null, 2));
    } else {
      readFromDb(dbPath, data, flag);
    }
  });
};

const methods = {
  "-list": function () {
    createFileIfNotExists("list");
  },
  "-add": function (data) {
    addFileIfNotExists(data, "add");
  },
};

function formulateTodo(arg) {
  if (arg.length === 1 && methods[arg[0]]) {
    methods[arg[0]]();
  } else {
    let rest = arg.slice(1).join(" ");
    methods[arg[0]](rest);
  }
  return arg;
}

var result = formulateTodo(argument.slice(2));

console.log(result);
