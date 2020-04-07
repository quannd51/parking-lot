const fs = require('fs');
const lotService = require('../src/service/parkingLot');

const readFile = async () => new Promise(resolve => {
  fs.readFile("file_inputs.txt", "utf-8", (err, data) => {
    if (err) {
      return resolve(err);
    }

    return resolve(data);
  });
});

const runFile = async () => {
  const contents = await readFile();

  if (contents.errno) {
    console.log("wrong format file");
  }

  const commands = contents.split("\n");

  for (let line of commands) {
    line = line.trim();

    const commandData = line.split(' ');
    const command = commandData[0];
    const variable1 = commandData[1];

    switch (command) {
      case 'create_parking_lot':
        await lotService.createParkingLot(variable1);

        break;
      case 'park':
        await lotService.parkACar(variable1);

        break;
      case 'leave':
        const hTime = commandData[2];
        await lotService.removeACar(variable1, hTime);

        break;
      case 'status':
        await lotService.status();

        break;
    }
  }

  console.log("run file successfully");

  return true;
};

runFile();

module.exports = {
  runFile,
  readFile
}