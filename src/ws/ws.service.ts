import { Instance } from 'express-ws';
import { WebSocket } from 'ws';
import { WsMessage } from './types/ws-types';

export class WsService {
  static broadcastConnection (msg: WsMessage, wss: Instance): void {
    wss.getWss().clients.forEach((client: WebSocket) => {
      client.send(JSON.stringify(msg.taskId));
    });
  }
  static login (ws: WebSocket, wss: Instance): void {
    wss.getWss().clients.add(ws);
  }
  static logout (wss: Instance, ws: WebSocket | WebSocket): void {
    wss.getWss().clients.delete(ws);
  }
}
