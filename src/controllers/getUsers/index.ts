import fs from 'fs';
import http from 'http';
import { User } from 'src/tsInterfaces';
import { validate } from 'uuid';
export default async function getUsers(
  userDataPath: string,
  res: http.ServerResponse<http.IncomingMessage>,
  searchId: string | undefined,
): Promise<void> {
  const users: string = await fs.promises.readFile(userDataPath, {
    encoding: 'utf-8',
  });
  if (searchId !== '' && searchId !== undefined) {
    if (!validate(searchId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Search id is not valid' }));
      return;
    }
    const usersArr: User[] = JSON.parse(users);
    const indexOfSearch = usersArr.findIndex((e: User) => e.id === searchId);
    if (indexOfSearch != -1) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(usersArr[indexOfSearch]));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Search id does not exist' }));
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(users);
  }
}
