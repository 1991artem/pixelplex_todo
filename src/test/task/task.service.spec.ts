/* eslint-disable @typescript-eslint/no-empty-function */

import { expect } from 'chai';
import 'mocha';

import { before, describe } from 'mocha';
import { AppError } from '@errors';
import { DataSource } from 'typeorm';
import { Task, TaskService } from '@task';
import { AppDataSource } from 'test/test-data-source';


const TEST_NAME = 'Task name 1';
const TEST_NAME2 = 'Group name 2';
const TEST_DESCRIPTION = 'Some text';
const USER_ID = '1';

let connection: DataSource;
let testGroup: Task;

describe('Test module task/task.service.ts', () => {
  before('Connect to DB', async () => {
    connection = await AppDataSource.initialize();
    testGroup = Task.create({
      name: 'dummy-task',
      description: 'Text',
    });
    await testGroup.save();
  });

  after('Disconnect from DB', async () => {
    await testGroup.remove();
    await connection.destroy();
  });

  describe('Test GroupService.createGroup()', () => {
    it('Throws an error if name is already taken', async () => {
      try {
        await TaskService.createTask({name: TEST_NAME, description: TEST_DESCRIPTION}, USER_ID);
      } catch (error) {
        expect(error).to.be.instanceOf(AppError, 'Task already exists');
      }
    });

    it('Saves new group successfully', async () => {
      const group = await TaskService.createTask({name: TEST_NAME2, description: TEST_DESCRIPTION}, USER_ID);
      await group.remove();
    });
  });
});
