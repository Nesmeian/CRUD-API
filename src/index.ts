import http from 'http';
import path from 'path';
import { config } from 'dotenv';
import { deleteUser, getUsers, postUsers, putUser } from './controllers/index';
const USERS_API_PATH = '/api/users/';
config();
const server = http.createServer(async (req, res) => {
  const userDataPath = path.join(__dirname, 'usersData', 'usersData.json');
  const id = req.url?.split('/')[3];

  try {
    if (req.url === USERS_API_PATH && req.method === 'POST') {
      await postUsers(userDataPath, res, req);
    } else if (req.url?.startsWith(USERS_API_PATH)) {
      switch (req.method) {
        case 'GET':
          await getUsers(userDataPath, res, id);
          break;
        case 'PUT':
          await putUser(userDataPath, res, req, id);
          break;
        case 'DELETE':
          await deleteUser(userDataPath, res, id);
          break;
        default:
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Method Not Allowed' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Wrong address' }));
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
});
const PORT: string | 3001 = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
