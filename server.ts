import express from 'express';
import config from 'config';
import startConnect from './src/connect';

const app = express();

const PORT: number = config.get('PORT') || 4200;

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});

startConnect();
