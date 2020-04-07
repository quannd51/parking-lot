const parkingLotService = require('../service/parkingLot');

module.exports.createParkingLot = function (capacity) {
  return parkingLotService.createParkingLot(capacity);
};