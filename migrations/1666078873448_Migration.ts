/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import config from 'config';
import { hash } from 'bcryptjs';
import chalk from 'chalk';

const collectionName: string = config.get('migratecollection');
const admin: string = process.env.ADMIN || 'admin';
const email: string = process.env.EMAIL || 'admin@admin.com';
const password: string = process.env.PASSWORD || 'admin';

export class Migration1666078873448 implements MigrationInterface {
  public async up(db: Db): Promise<void> {
    try {
      const collection = await db.collection(collectionName);
      const administrator = await collection.findOne({
        email: email,
      });
      const hashedPassword: string = await hash(password, 12);
      const admin_params = {
        username: admin,
        password: hashedPassword,
        email: email,
        admin: true,
      };
      if (administrator) {
        await administrator.updateOne(admin_params);
        await administrator.save();
        console.log(chalk.green('\nAdmin updated\n'));
        return;
      } else {
        await collection.insertOne(admin_params);
        console.log(chalk.green('\nAdmin created\n'));
      }
    } catch (error) {
      console.log(chalk.red('Uuppss :( Something went wrong, please try again'));
    }
  }
  public async down(db: Db): Promise<void> {
    try {
      await db.dropCollection(collectionName);
      console.log(chalk.yellowBright('\nCollection deleted\n'));
    } catch (error) {
      console.log(chalk.red('Uuppss :( Something went wrong, please try again'));
    }
  }
}
