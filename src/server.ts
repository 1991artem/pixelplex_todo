import dotenv from 'dotenv';
import Connect from './connect';
import App from './app';

dotenv.config();

const app: App = new App();
const connect: Connect = new Connect();

connect.start(); // start the App
app.lesten(); // start the Listan Server
app.midleware();
