import http from 'http';
import path from 'path';
import fs from 'fs';

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
  if (req.method === 'POST') {
    req.on('data', (chunk) => {
      readUsers();
      console.log(JSON.parse(chunk));
    });
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log('Сервер запущен');
});
async function readUsers(): Promise<void> {
  const userDataPath = path.join(__dirname, 'usersData', 'usersData.json');
  console.log(await fs.promises.readFile(userDataPath, { encoding: 'utf-8' }));
}
