const parkingLot = require('../../bin/parking_lot');
const lotService = require('../../src/service/parkingLot');

describe('runFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should success', async () => {
    parkingLot.readFile = jest.fn().mockResolvedValue(
      `create_parking_lot 6
      park KA-01-HH-3141
      leave KA-01-HH-3141 4
      status`
    );

    lotService.createParkingLot = jest.fn();
    lotService.parkACar = jest.fn();
    lotService.removeACar = jest.fn();
    lotService.status = jest.fn();

    const result = await parkingLot.runFile();

    expect(result).toBeTruthy();
  });
});