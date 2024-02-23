const { sqlForPartialUpdate } = require('./sql');
const { BadRequestError } = require('../expressError');

describe('sqlForPartialUpdate', () => {
  test('Generates correct SQL for single field update', function () {
    const result = sqlForPartialUpdate(
        { f1: 'vi' },
        { f1: 'f1', fF2: 'f2' });

    expect(result).toEqual({
      setCols: '\"f1\"=$1',
      values: ['vi'],
    });
  });

  test('Generates correct SQL for multiple fields update', function () {
    const result = sqlForPartialUpdate(
        { f1: 'vi', jsF2: 'v2' },
        { jsF2: 'f2' });

    expect(result).toEqual({
      setCols: '\"f1\"=$1, \"f2\"=$2',
      values: ['vi', 'v2'],
    });
  });
  
  test('Throws BadRequestError when no data provided', () => {
    const dataToUpdate = {};
    const jsToSql = {};
    expect(() => sqlForPartialUpdate(dataToUpdate, jsToSql)).toThrowError(BadRequestError);
  });
});
