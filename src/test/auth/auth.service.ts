/* eslint-disable @typescript-eslint/no-empty-function */

import { expect } from 'chai';
import { before, describe } from 'mocha';

import { DataSource } from 'typeorm';
import { AppError } from '@errors';
import { User } from '@user';
import { AppDataSource } from 'test/test-data-source';
import { authService } from '@auth';

const TEST_EMAIL = 'test@test.com';
const TEST_EMAIL2 = 'test2@test.com';
const TEST_PASSWORD2 = 'strong_password';
const TEST_USERNAME2 = 'original_username';

let connection: DataSource;
let testUser: User;

describe('Test module auth/auth.service.ts', () => {
  before('Connect to DB', async () => {
    connection = await AppDataSource.initialize();
    testUser = User.create({
      email: TEST_EMAIL,
      name: 'dummy-user',
      password: 'password',
    });
    await testUser.save();
  });

  after('Disconnect from DB', async () => {
    await testUser.remove();
    await connection.destroy();
  });

  describe('Test AuthService.createUser()', () => {
    it('Throws an error if email is already taken', async () => {
      try {
        await authService.createUser({ email: TEST_EMAIL, password: 'password', name: 'original_name' });
      } catch (error) {
        expect(error).to.be.instanceOf(AppError, 'User with this email address already exists');
      }
    });

    it('Saves new user successfully', async () => {
      const user = await authService.createUser({ email: TEST_EMAIL2, password: TEST_PASSWORD2, name: TEST_USERNAME2 });
      await user.remove();
    });
  });

  describe('Test AuthService.login()', () => {
    it('Logins new user successfully', async () => {
      const user = await authService.createUser({ email: TEST_EMAIL2, password: TEST_PASSWORD2, name: TEST_USERNAME2 });
      const token = await authService.login({ email: TEST_EMAIL2, password: TEST_PASSWORD2 });
      expect(token).to.be.a('string');
      await user.remove();
    });

    it('Throws an error if user doesn\'t exist', async () => {
      try {
        await authService.login({ email: TEST_EMAIL2, password: TEST_PASSWORD2 });
      } catch (error) {
        expect(error).to.be.instanceOf(AppError, 'Authentication failed. Check your email/password.');
      }
    });

    it('Throws an error if password is wrong', async () => {
      const user = await authService.createUser({ email: TEST_EMAIL2, password: TEST_PASSWORD2, name: TEST_USERNAME2 });
      try {
        await authService.login({ email: TEST_EMAIL2, password: 'wrong_password' });
      } catch (error) {
        expect(error).to.be.instanceOf(AppError, 'Authentication failed. Check your email/password.');
      }
      await user.remove();
    });
  });
});
