/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import config from 'config';
import { hash } from 'bcryptjs';
import chalk from 'chalk';

const collectionName: string = config.get('migratecollection');
const admin: string = config.get('admin');
const email: string = config.get('email');

export class Migration1666078873448 implements MigrationInterface {
  public async up(db: Db): Promise<any> {
    try {
      const collection = await db.collection(collectionName);
      const isAdmin = await collection.findOne({
        email: email,
      });
      const hashedPassword: string = await hash(config.get('password'), 12);
      const params = {
        username: admin,
        password: hashedPassword,
        email: email,
        admin: true,
      };
      if (isAdmin) {
        await isAdmin.updateOne(params);
        await isAdmin.save();
        console.log(chalk.green('\nAdmin updated\n'));
        return;
      } else {
        await collection.insertOne(params);
        console.log(chalk.green('\nAdmin created\n'));
      }
    } catch (error) {
      console.log(chalk.red('Uuppss :( Something went wrong, please try again'));
    }
  }
  public async down(db: Db): Promise<any> {
    try {
      await db.dropCollection(collectionName);
      console.log(chalk.yellowBright('\nCollection deleted\n'));
    } catch (error) {
      console.log(chalk.red('Uuppss :( Something went wrong, please try again'));
    }
  }
}
