import {connect, connection} from 'mongoose';
import config from 'config';


const db: string = config.get('mongoUri')

export default () => {
  const startConnect = async () => {
  await connect(
        db,
        { connectTimeoutMS: 4000 }
      )
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  startConnect();

  connection.on('disconnected', connect);
};