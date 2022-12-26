import { Instance } from 'express-ws';
import { WebSocket } from 'ws';
import { WsService } from './ws.service';

export class WsComtroller {
  static messageHandler(message: string, wss: Instance): void {
    const msg = JSON.parse(message);
    WsService.broadcastConnection(msg, wss);
  }
  static login(ws: WebSocket, wss: Instance): void {
    WsService.login(ws, wss);
  }
  static logout(wss: Instance, ws: WebSocket): void {
    WsService.logout(wss, ws);
  }
}
