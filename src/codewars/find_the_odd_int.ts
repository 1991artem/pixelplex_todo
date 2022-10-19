/* eslint-disable no-console */
import { question } from 'readline-sync';
import chalk from 'chalk';

export const find_odd_number_task = (): string => {
  console.log(chalk.yellowBright(`Given an array of integers, find the one that appears an odd number of times.

There will always be only one integer that appears an odd number of times.

Examples

[7] should return 7, because it occurs 1 time (which is odd).
[0] should return 0, because it occurs 1 time (which is odd).
[1,1,2] should return 2, because it occurs 1 time (which is odd).
[0,1,0,1,0] should return 0, because it occurs 3 times (which is odd).
[1,2,2,3,3,3,4,3,3,3,2,2,1] should return 4, because it appears 1 time (which is odd).
  `));
  const insertArray: string = question(chalk.blue('\nInsert array (for exaple - 1,2,3,4,5)\n'));
  const array: Array<number> =
    !insertArray ? [1,2,2,3,3,3,4,3,3,3,2,2,1] : insertArray.trim().split(/[.,]/g).map(string => +string.replace(/\D+/g, '')).filter((el: number | object) => el === el);

  console.log(chalk.green(`Array is: [${array}]`));
  const find_odd_number = ( arrayOfNumber: Array<number> ): number => {
    const result = arrayOfNumber.find((item: number) =>
      arrayOfNumber.filter((el: number) => el == item).length % 2);
    return result ? result : 0;
  };

  return chalk.green.bold(`\n---- Task result is ${find_odd_number(array)} ----\n`);
};
