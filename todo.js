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

const taskCompleted = (data, flag) => {
  readFromDb(dbPath, data, flag);
};

const taskDeleted = (data, flag) => {
  readFromDb(dbPath, data, flag);
};

const methods = {
  "-list": function () {
    createFileIfNotExists("list");
  },
  "-add": function (data) {
    if (data.trim() === "") {
      console.log("you need to add a data to store");
    } else {
      addFileIfNotExists(data, "add");
    }
  },
  "-complete": function (data) {
    if (data.trim() === "" || isNaN(data.trim())) {
      console.log("Data is not a number");
    } else {
      taskCompleted(Number(data.trim()), "complete");
    }
  },
  "-delete": function (data) {
    if (data.trim() === "" || isNaN(data.trim())) {
      console.log("Data is not a number");
    } else {
      taskDeleted(Number(data.trim()), "delete");
    }
  },
};

function formulateTodo(arg) {
  if (arg.length === 1 && methods[arg[0]]) {
    methods[arg[0]]();
  } else {
    let rest = arg.slice(1).join(" ");
    methods[arg[0].toLowerCase()](rest);
  }
  return arg;
}

var result = formulateTodo(argument.slice(2));

console.log(result);
