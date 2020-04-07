const fs = require('fs');

const createFile = () => {
  const data = {
    capacity: 0,
    slotNumber: {}
  }

  fs.writeFile("data.txt", JSON.stringify(data), (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
};

createFile();

module.exports = {
  createFile
}