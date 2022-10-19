/* eslint-disable no-console */
import { question } from 'readline-sync';
import chalk from 'chalk';

export const permute_palindrome = (): void => {
  console.clear();
  console.log(chalk.yellowBright(`\nWrite a function that will check whether 
ANY permutation of the characters of the input string is a palindrome. 
Bonus points for a solution that is efficient and/or that uses only built-in language functions. 
Deem yourself brilliant if you can come up with a version that does not use any function whatsoever.

Example

madam -> True
adamm -> True
junk -> False

Hint

The brute force approach would be to generate all the permutations of the string and check each one 
of them whether it is a palindrome. However, an optimized approach will not require this at all.
  `));
  const insert: string = question(chalk.blue('\nInsert your word\n'),{
    limit: /[a-z]/gi,
    limitMessage: 'Sorry,is not a word',
    defaultInput: 'madam',
  });

  console.log(chalk.green(`Word is: ${insert}`));
  const check_palindrome = (word: string): boolean => {
    const inputArr = [...word];
    const set = [...new Set([...word])];
    const map = set.map((elem) => {
      return inputArr.filter(value => elem === value).length%2;
    });
    return map.filter((l) => l === 1).length > 1 ? false : true;
  };
  console.log(check_palindrome(insert) ? chalk.green.bold(`\n${insert} is polyndrom\n`) : chalk.red.bold(`\n${insert} is not a polydrome\n`));
};

