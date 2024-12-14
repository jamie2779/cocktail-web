// server.mjs
import { createServer } from 'http';
import { parse } from 'url';
import { WebSocketServer } from 'ws';
import next from 'next';
import {setHardwareSocket, updateResponse} from './hardware-control.mjs';
// 하드웨어 소켓을 저장할 변수 (복수개면 Map이나 배열 사용)
let hardwareSocket = null;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws, ) => {
    console.log('New WebSocket connection');
    // 예를 들어, 특정 요청 헤더나 쿼리 파라미터를 통해
    // 이 커넥션이 하드웨어인지 식별할 수도 있음
    // 여기서는 단순히 첫 연결을 하드웨어라 가정
    setHardwareSocket(ws);
    ws.send("0");
    ws.on('message', (message) => {
      console.log('Received from hardware:', message.toString());
      updateResponse(message.toString());
    });

    ws.on('close', () => {
      if (hardwareSocket === ws) {
        setHardwareSocket(null);
      }
    });
  });

  server.on('upgrade', (request, socket, head) => {
    const { pathname } = parse(request.url);
    if (pathname === '/api/socket') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
    console.log('> WebSocket Endpoint for hardware: ws://localhost:3000/api/hardware-socket');
  });
});
