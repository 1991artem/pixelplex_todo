/* eslint-disable @typescript-eslint/no-empty-function */

import { expect } from 'chai';
import { before, describe } from 'mocha';

import { DataSource } from 'typeorm';
import { AppError } from '@errors';
import { Group, GroupService } from '@group';
import { AppDataSource } from 'test/test-data-source';

const TEST_NAME = 'Group name 1';
const TEST_NAME2 = 'Group name 2';
const TEST_DESCRIPTION = 'Some text';
const TEST_ID = '1';

let connection: DataSource;
let testGroup: Group;

describe('Test module group/group.service.ts', () => {
  before('Connect to DB', async () => {
    connection = await AppDataSource.initialize();
    testGroup = Group.create({
      name: 'dummy-group',
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
        await GroupService.createGroup({ name: TEST_NAME, description: TEST_DESCRIPTION });
      } catch (error) {
        expect(error).to.be.instanceOf(AppError, 'Group already exists');
      }
    });

    it('Saves new group successfully', async () => {
      const group = await GroupService.createGroup({ name: TEST_NAME2, description: TEST_DESCRIPTION });
      await group.remove();
    });
  });
  describe('Test GroupService.getGroupById()', () => {
    it('Throws an error if group not found', async () => {
      try {
        await GroupService.getGroupById(TEST_ID);
      } catch (error) {
        expect(error).to.be.instanceOf(AppError, 'Group not found');
      }
    });
  });
});
