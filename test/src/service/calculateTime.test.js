const calculaTimeService = require('../../../src/service/calculateTime');

describe('chargeViaTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return 10 when time < 3', async () => {
    const mockHour = 2;
    const result = calculaTimeService.chargeViaTime(mockHour);

    expect(result).toEqual(10);
  });

  test('should return 30 when time > 3', async () => {
    const mockHour = 4;
    const result = calculaTimeService.chargeViaTime(mockHour);

    expect(result).toEqual(30);
  });
});