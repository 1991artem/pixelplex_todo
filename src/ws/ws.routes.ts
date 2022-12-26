/* eslint-disable no-console */
import { Instance } from 'express-ws';
import WebSocket from 'ws';
import { WsComtroller } from './ws.controller';

export function mountWsRouter(wss: Instance): void {
  wss.getWss().on('connection', (ws: WebSocket, req: Request) => {
    console.log(`Open ws connection ${req.url}`);
  });
  wss.app.ws('/api/v1/task/create', (ws: WebSocket) => {
    ws.on('message', (message: string) => WsComtroller.messageHandler(message, wss));
  });
  wss.app.ws('/api/v1/auth/login', (ws: WebSocket) => {
    ws.on('message', () => {
      WsComtroller.login(ws, wss);
    });
  });
  wss.app.ws('/api/v1/auth/logout', (ws: WebSocket) => {
    ws.on('close', () => WsComtroller.logout(wss, ws));
  });
}
