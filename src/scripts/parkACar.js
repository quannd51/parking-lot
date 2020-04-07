const parkingLotService = require('../service/parkingLot');

module.exports.parkACar = function (carNumber) {
  return parkingLotService.parkACar(carNumber);
};