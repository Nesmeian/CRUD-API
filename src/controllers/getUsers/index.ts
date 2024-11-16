import fs from 'fs';
import http from 'http';
export default async function getUsers(
  userDataPath: string,
  res: http.ServerResponse<http.IncomingMessage>,
): Promise<void> {
  const users: string = await fs.promises.readFile(userDataPath, {
    encoding: 'utf-8',
  });
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(users);
}
