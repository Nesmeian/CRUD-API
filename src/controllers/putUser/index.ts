import fs from 'fs/promises';
import http from 'http';
import parseData from '..//..//utils/index';
import { User } from 'src/tsInterfaces';
import { validate } from 'uuid';
export default async function putUser(
  path: string,
  res: http.ServerResponse<http.IncomingMessage>,
  reg: http.IncomingMessage,
  searchId: string | undefined,
): Promise<void> {
  const userData: User[] = JSON.parse(
    await fs.readFile(path, { encoding: 'utf-8' }),
  );
  const updateUser = await parseData(reg);
  const searchIndex = userData.findIndex((e) => e.id === searchId);
  if ('id' in updateUser) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: 'ID should not be provided by the client' }),
    );
    return;
  }
  if (searchId !== '' && searchId !== undefined) {
    if (!validate(searchId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Search id is not valid' }));
      return;
    }
    if (searchIndex !== -1) {
      if (
        updateUser.age !== undefined &&
        updateUser.hobbies !== undefined &&
        updateUser.username !== undefined
      ) {
        const newUser = {
          id: searchId,
          ...updateUser,
        };
        userData[searchIndex] = newUser;
        fs.writeFile(path, JSON.stringify(userData, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userData[searchIndex]));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Request body is not correct' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Search id does not exist' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Search id does not exist' }));
  }
}
