const { format_date } = require('../utils/helpers');

test('format_date() formats a date object into a string in the format M/D/YYYY', () => {
    // Test with a regular date
    const regular_date = new Date('2020-03-20 16:12:03');
    expect(format_date(regular_date)).toBe('3/20/2020');
  
    // Test with a date near the beginning of the month
    const beginning_of_month = new Date('2020-03-01 00:00:00');
    expect(format_date(beginning_of_month)).toBe('3/1/2020');

    // Test with a date near the end of the month
    const end_of_month = new Date('2020-03-31 23:59:59');
    expect(format_date(end_of_month)).toBe('3/31/2020');

});
