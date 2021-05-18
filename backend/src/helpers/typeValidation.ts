import IValueAndTolerance from '../models/IValueAndTolerance'

/**
* Function to test IValueAndTolerance type compatibility
* @param test value to be detemined as IValueAndTolerance
* @returns true if the type of test is IValueAndTolerance
*/
export function isIValueAndTolerance(test: any): test is IValueAndTolerance[] {
  if (test.length  === 0) return false;

  let flag = true
  test.map((element:any) => {

    if (element.value === undefined ||element.tolerance === undefined) {
      flag = false;
    } else if ((typeof(element.value) !== 'number')) {
      flag = false;
    }
  });
  return flag;
}
