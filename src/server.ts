import Connect from './connect';
import App from './app';
import * as dotenv from 'dotenv'

dotenv.config();

const app: App = new App();
const connect: Connect = new Connect();

app.listen(); // listen Server
connect.connection(); // connect to DB
app.modules();
