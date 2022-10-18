/* eslint-disable @typescript-eslint/no-explicit-any */
import { Db } from 'mongodb'
import { MigrationInterface } from 'mongo-migrate-ts';
import config from 'config';
import bcrypt from 'bcryptjs';

const collectionName: string = config.get('migratecollection');

export class Migration1666078873448 implements MigrationInterface {
  public async up(db: Db): Promise<any> {
    try {
      const collection = await db.collection(collectionName);
      const isMatch = await collection.findOne({
        email: 'admin@admin.com'
      })
      if (isMatch) {
        return console.log('\nThis user already exists\n');
      } else {
        const password = 'Admin123!';
        const hashedPassword: string = await bcrypt.hash(password, 12);
        await collection.insertOne({
          username: 'admin',
          password: hashedPassword,
          email: 'admin@admin.com',
          admin: true
        })
      }
    } catch (error) {
      console.log('Uuppss :( Something went wrong, please try again');
    }
  }

  public async down(db: Db): Promise<any> {
    try {
      await db.dropCollection(collectionName);
    } catch (error) {
      console.log('Uuppss :( Something went wrong, please try again');
    }
  }
}
