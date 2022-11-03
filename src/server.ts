import dotenv from 'dotenv';
import Connect from './connect';
import App from './app';

dotenv.config();
console.log(process.env.DB_PASSWORD)

const app: App = new App();
const connect: Connect = new Connect();

app.listen(); // listen Server
connect.connection(); // connect to DB
app.modules();
