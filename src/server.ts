
import Connect from './connect';
import App from './app';

const app: App = new App();
const connect: Connect = new Connect();

connect.start();        // start the App
app.listan();           // start the Listan Server
app.midleware();
