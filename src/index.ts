/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { question } from 'readline-sync';
import chalk from 'chalk';

import { find_odd_number_task } from './codewars/find_the_odd_int';
import { permute_palindrome } from './codewars/permute_a_palindrome';

const name = question(chalk.green('\nHi what\'s your name?\n'));

const tryAgain = (): void => question(chalk.blue('Want to try again? y/n\n')) === 'y' ? taskChooser() : console.log(chalk.red.bold(`Goodbye,${name}, have a good day!\n`));

const taskChooser = (): void => {
  const task: string = question(chalk.green(`\nHello ${name}, today we will solve couple interesting tasks
  Please, insert task number
  
  1. Find the odd int
  2. Permute a Palindrome
  3. Special Multiples
  4. Reverse or rotate?
  
  Choose adp press "Enter"
  
  To exit tasks press 'q' or cntrl+c key combination
  
  Thanks :)
  
  Task #`));

  switch (task) {
  case '1':
    console.log(find_odd_number_task());
    tryAgain();
    break;
  case '2':
    console.log(permute_palindrome());
    tryAgain();
    break;
  case '3':
    tryAgain();
    break;
  case '4':
    tryAgain();
    break;
  case 'q': console.log(chalk.red('Looking forward to seeing you in the future'));
    break;
  default:
    console.log(chalk.red('\nDid you enter something wrong'));
    tryAgain();
  };
};
taskChooser();
