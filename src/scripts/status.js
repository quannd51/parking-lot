const parkingLotService = require('../service/parkingLot');

module.exports.status = function () {
  return parkingLotService.status();
};