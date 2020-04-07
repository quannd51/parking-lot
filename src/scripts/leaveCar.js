const parkingLotService = require('../service/parkingLot');

module.exports.leave = function (carNumber, hTime) {
  return parkingLotService.removeACar(carNumber, hTime);
};