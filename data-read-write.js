import fs from "fs";

export function writeToDb(dbPath, data) {
  fs.writeFile(dbPath, data, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

export function readFromDb(path, info, flag) {
  fs.readFile(path, function (err, data) {
    if (err) {
      return "unable to get data";
    }
    data = JSON.parse(data);
    if (flag === "add") {
      const obj = { todo: info, completed: false };
      data.push(obj);
      writeToDb(path, JSON.stringify(data, null, 2));
    } else if (flag === "list") {
      for (var i = 0; i < data.length; i++) {
        let todos = data[i]
        console.log(`(${i}) ${todos.todo}`);
      }
    }
  });
}
