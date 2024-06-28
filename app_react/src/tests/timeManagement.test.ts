import { displayToday } from "../utils/timeManagement";

describe('displayToday', () => {
  const RealDate = Date;

  beforeAll(() => {
    global.Date = jest.fn(() => new RealDate('2023-06-15T00:00:00Z')) as any;
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  it('returns the correct date format', () => {
    const result = displayToday();
    expect(result).toBe('15-06-2023');
  });
});