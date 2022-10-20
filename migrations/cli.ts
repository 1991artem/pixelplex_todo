import { mongoMigrateCli } from 'mongo-migrate-ts';

mongoMigrateCli({
  uri: process.env.MONGO_URI || '',
  database: 'app',
  migrationsDir: __dirname,
  migrationsCollection: 'migrationlog',
});
