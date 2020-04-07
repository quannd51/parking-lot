const parkingLotService = require('../../../src/service/parkingLot');
const dbLot = require('../../../src/database/lot');

describe('createParkingLot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should success when dataFile is not existed', async () => {
    const mockCapacity = 6;
    dbLot.readFile = jest.fn().mockResolvedValue({
      errno: true
    });

    const result = await parkingLotService.createParkingLot(mockCapacity);

    expect(result).toBeTruthy();
  });

  test('should success when dataFile is existed and have no any data', async () => {
    const mockCapacity = 6;
    dbLot.readFile = jest.fn().mockResolvedValue({
      capacity: 2,
      slotNumber: {
        1: '',
        2: ''
      }
    });

    const result = await parkingLotService.createParkingLot(mockCapacity);

    expect(result).toBeTruthy();
  });

  test('should failed when dataFile is existed and have some data', async () => {
    const mockCapacity = 6;
    dbLot.readFile = jest.fn().mockResolvedValue({
      capacity: 2,
      slotNumber: {
        1: 'AAAA-123',
        2: ''
      }
    });

    const result = await parkingLotService.createParkingLot(mockCapacity);

    expect(result).toBeFalsy();
  });

  test('should failed when capacity is 0', async () => {
    const mockCapacity = 0;
    const result = await parkingLotService.createParkingLot(mockCapacity);

    expect(result).toBeFalsy();
  });
});

describe('parkACar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should failed when have any db', async () => {
    dbLot.readFile = jest.fn().mockResolvedValue({
      errno: true
    });

    const result = await parkingLotService.parkACar('AAA-12345');

    expect(result).toBeFalsy();
  });

  test('should success', async () => {
    dbLot.readFile = jest.fn().mockResolvedValue({
      capacity: 2,
      slotNumber: {
        1: '',
        2: ''
      }
    })
    .mockResolvedValueOnce({
      capacity: 2,
      slotNumber: {
        1: '',
        2: ''
      }
    });

    const result = await parkingLotService.parkACar('AAA-12345');

    expect(result).toBeTruthy();
  });

  test('should failed when lots is full', async () => {
    dbLot.readFile = jest.fn().mockResolvedValue({
      capacity: 2,
      slotNumber: {
        1: 'AAA',
        2: 'BBB'
      }
    })
    .mockResolvedValueOnce({
      capacity: 2,
      slotNumber: {
        1: 'AAA',
        2: 'BBB'
      }
    });

    const result = await parkingLotService.parkACar('AAA-12345');

    expect(result).toBeFalsy();
  });
});

describe('removeACar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should failed when time < 1', async () => {
    const result = await parkingLotService.removeACar('AAAA', 0);

    expect(result).toBeFalsy();
  });

  test('should failed when have no any db', async () => {
    dbLot.readFile = jest.fn().mockResolvedValue({
      errno: true
    });

    const result = await parkingLotService.removeACar('AAAA', 1);

    expect(result).toBeFalsy();
  });

  test('should success', async () => {
    dbLot.readFile = jest.fn().mockResolvedValue({
      capacity: 2,
      slotNumber: {
        1: 'AAA',
        2: 'BBB'
      }
    });
    dbLot.updateFile = jest.fn();

    const result = await parkingLotService.removeACar('AAA', 1);

    expect(result).toBeTruthy();
  });
});

describe('status', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return false', async () => {
    dbLot.readFile = jest.fn().mockResolvedValue({
      errno: true
    });

    const result = await parkingLotService.status();
    expect(result).toBeFalsy();
  });

  test('should return true', async () => {
    dbLot.readFile = jest.fn().mockResolvedValue({
      capacity: 2,
      slotNumber: {
        1: 'AAA',
        2: 'BBB'
      }
    });

    const result = await parkingLotService.status();
    expect(result).toBeTruthy();
  });
});
