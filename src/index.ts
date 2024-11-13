import http from 'http';
import path from 'path';
import { User } from './tsInterfaces/index';
// import fs from 'fs';
import { postUsers } from './controllers/index';
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
  if (req.method === 'POST') {
    req.on('data', async (chunk) => {
      const userDataPath = path.join(__dirname, 'usersData', 'usersData.json');
      const chunkData: User = JSON.parse(chunk);
      postUsers(userDataPath, chunkData);
    });
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log('Сервер запущен');
});
