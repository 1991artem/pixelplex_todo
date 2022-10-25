import dotenv from 'dotenv';
import Connect from './connect';
import App from './app';

dotenv.config();

const app: App = new App();
const connect: Connect = new Connect();

connect.start(); // connect to (Mongoose), start SERVER
app.lesten(); // listen Server
app.modules();