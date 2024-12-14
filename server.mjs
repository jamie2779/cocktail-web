// server.mjs
import { createServer } from 'http';
import { parse } from 'url';
import { WebSocketServer } from 'ws';
import next from 'next';
import { setHardwareSocket, updateResponse } from './hardware-control.mjs';
import http from 'http'; // DELETE 요청을 위해 http 모듈 추가

// 하드웨어 소켓을 저장할 변수 (복수개면 Map이나 배열 사용)
let hardwareSocket = null;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * /api/next로 DELETE 요청을 보내는 함수
 */
const sendDeleteRequestToNext = () => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/next',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      console.log(`DELETE /api/next response:`, responseData);
    });
  });

  req.on('error', (error) => {
    console.error('Error making DELETE request to /api/next:', error);
  });

  req.end();
};

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    
    // 하드웨어 소켓 설정
    setHardwareSocket(ws);
    ws.send("0");

    ws.on('message', (message) => {
      console.log('Received from hardware:', message.toString());
      if(message.toString() === "connect" || message.toString() === "idle"){
        sendDeleteRequestToNext();
      }
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
    console.log('> WebSocket Endpoint for hardware: ws://localhost:3000/api/socket');
  });
});
