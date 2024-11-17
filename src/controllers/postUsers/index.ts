import { User } from '..//..//tsInterfaces/index';
import fs from 'fs';
import http from 'http';
import parseData from '..//..//utils/index';
import { v4 as uuidv4 } from 'uuid';
export default async function postUsers(
  path: string,
  res: http.ServerResponse<http.IncomingMessage>,
  req: http.IncomingMessage,
): Promise<void> {
  try {
    const data = await fs.promises.readFile(path, { encoding: 'utf-8' });
    const usersData: User[] = JSON.parse(data);
    const users = usersData.map((e) => e.username);
    const newUserChunk = await parseData(req);
    if ('id' in newUserChunk) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ message: 'ID should not be provided by the client' }),
      );
      return;
    }
    if (users.indexOf(newUserChunk.username) === -1) {
      if (
        newUserChunk.age !== undefined &&
        newUserChunk.hobbies !== undefined &&
        newUserChunk.username !== undefined &&
        newUserChunk.username.trim() !== ''
      ) {
        const newUserId = uuidv4();
        const newUser = {
          id: newUserId,
          ...newUserChunk,
        };
        usersData.push(newUser);
        await fs.promises.writeFile(path, JSON.stringify(usersData, null, 2));
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Body reguest is not correct' }));
      }
    } else {
      res.writeHead(409, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User  already exists' }));
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Body reguest is not correct' }));
  }
}
