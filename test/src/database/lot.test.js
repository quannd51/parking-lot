const fs = require('fs');
const lotDb = require('../../../src/database/lot');

describe('lot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createFile should error', async () => {
    fs.writeFile = jest.fn().mockImplementation((path, data, cb) => {
      cb('error');
    });

    const result = await lotDb.createFile('12345');

    expect(result).toEqual('error');
  });

  test('readFile should error', async () => {
    fs.readFile = jest.fn().mockImplementation((path, data, cb) => {
      cb('error');
    });

    const result = await lotDb.readFile();
    expect(result).toEqual('error');
  });
});