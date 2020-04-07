const fs = require('fs');

const createFile = async data => new Promise(resolve => {
  fs.writeFile("data.txt", JSON.stringify(data), (err) => {
    if (err) {
      return resolve(err);
    }

    return resolve(true);
  });
});

const readFile = async () => new Promise(resolve => {
  fs.readFile("data.txt", "utf-8", (err, data) => {
    if (err) {
      return resolve(err);
    }

    return resolve(JSON.parse(data));
  });
});

const updateFile = async (data) => new Promise(resolve => {
  fs.writeFile('data.txt', JSON.stringify(data), function (err) {
    if (err) {
      return resolve(err);
    }

    return resolve(true);
  });
});

module.exports = {
  createFile,
  readFile,
  updateFile
}