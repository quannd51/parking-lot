const lots = require('../database/lot');
const chargeTime = require('./calculateTime');

const createParkingLot = async capacity => {
  if (capacity > 0) {
    const data = {
      capacity,
      slotNumber: {}
    }

    for (let i = 1; i <= capacity; i += 1) {
      data.slotNumber[i] = '';
    }

    const checkExistedFIle = await lots.readFile();
    if (checkExistedFIle.errno) {
      await lots.createFile(data);
      console.log(`Created parking lot with ${capacity} slots`);

      return true;
    } else {
      const keys = Object.keys(checkExistedFIle.slotNumber);
      let count = 0;
      for (const position of keys) {
        const parkedCarNumber = checkExistedFIle.slotNumber[position];

        if (parkedCarNumber) {
          count++;
        }
      }

      if (count > 0) {
        console.log(`can not create slot, maybe have ${count} car(s) in slots`);

        return false
      } else {
        await lots.createFile(data);
        console.log(`Created parking lot with ${capacity} slots`);

        return true;
      }
    }
  } else {
    console.log("capacity should greater than 0");

    return false;
  }
};

const getEmptySlot = async () => {
  const data = await lots.readFile();
  const keys = Object.keys(data.slotNumber);
  const listEmptyLot = [];

  if (keys.length > 0) {
    for (const position of keys) {
      const slot = data.slotNumber[position];

      if (!slot) {
        listEmptyLot.push(position);
      }
    }
  }

  return listEmptyLot;
};

const parkACar = async carNumber => {
  const data = await lots.readFile();

  if (data.errno) {
    console.log("need create slot first");
    return false;
  }

  const listEmptySlot = await getEmptySlot();

  if (listEmptySlot.length > 0) {
    const position = listEmptySlot[0];
    data.slotNumber[position] = carNumber;
    console.log(`Allocated slot number: ${position}`);
  } else {
    console.log("Sorry, parking lot is full");
    return false;
  }

  await lots.updateFile(data);

  return true;
};

const removeACar = async (carNumber, hour = 0) => {
  if (hour < 1) {
    console.log("min time to calculate is 1");
    return false;
  }

  const data = await lots.readFile();

  if (data.errno) {
    console.log("need create slot first");
    return false;
  }

  const keys = Object.keys(data.slotNumber);

  for (const position of keys) {
    const parkedCarNumber = data.slotNumber[position];

    if (`${parkedCarNumber}` == `${carNumber}`) {
      data.slotNumber[position] = '';
      const cost = chargeTime.chargeViaTime(hour);
      console.log(`Registration number ${carNumber} with Slot Number ${position} is free with Charge ${cost}`);
      break;
    }
  }

  await lots.updateFile(data);

  return true;
};

const status = async () => {
  const data = await lots.readFile();

  if (data.errno) {
    console.log("need create slot first");

    return false;
  } else {
    const keys = Object.keys(data.slotNumber);
    console.log(`Slot No.\tRegistration No.`);
    for (const position of keys) {
      const parkedCarNumber = data.slotNumber[position];

      if (parkedCarNumber) {
        console.log(`${position}\t\t${parkedCarNumber}`);
      } else {
        console.log(`${position}\t\tEmpty`);
      }
    }

    return true;
  }
};

module.exports = {
  createParkingLot,
  parkACar,
  removeACar,
  status
};
