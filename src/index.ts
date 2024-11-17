import http from 'http';
import path from 'path';
import { getUsers, postUsers } from './controllers/index';
const server = http.createServer(async (req, res) => {
  const userDataPath = path.join(__dirname, 'usersData', 'usersData.json');
  const id = req.url?.split('/')[3];
  try {
    if (req.url === '/api/users' && req.method === 'POST') {
      postUsers(userDataPath, res, req);
    }
    if (req.url?.match('/api/users')) {
      if (req.method === 'GET') {
        getUsers(userDataPath, res, id);
      }
    }
  } catch {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Wrong address' }));
  }
});
const PORT: string | 3001 = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('Сервер запущен');
});
