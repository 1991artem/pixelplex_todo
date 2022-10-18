import { mongoMigrateCli } from 'mongo-migrate-ts';
import config from 'config';

mongoMigrateCli({
  uri: config.get('mongoUri'),
  database: 'app',
  migrationsDir: __dirname,
  migrationsCollection: 'migrationlog',
});