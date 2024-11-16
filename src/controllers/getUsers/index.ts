import fs from 'fs';
import http from 'http';
import { User } from '../../tsInterfaces/index';
export default async function getUsers(
  userDataPath: string,
  res: http.ServerResponse<http.IncomingMessage>,
): Promise<void> {
  const data = await fs.promises.readFile(userDataPath, { encoding: 'utf-8' });
  const users: User[] = JSON.parse(data);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(users);
  res.end(users);
}
