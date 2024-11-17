import http from 'http';
import fs from 'fs/promises';
import { User } from 'src/tsInterfaces';
import { validate } from 'uuid';
export default async function deleteUser(
  path: string,
  res: http.ServerResponse<http.IncomingMessage>,
  searchId: string | undefined,
): Promise<void> {
  const usersData: User[] = JSON.parse(
    await fs.readFile(path, { encoding: 'utf-8' }),
  );
  const searchIndex = usersData.findIndex((e) => e.id === searchId);
  if (searchId !== '' && searchId !== undefined) {
    if (!validate(searchId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Search id is not valid' }));
      return;
    }
    if (searchIndex != -1) {
      usersData.splice(searchIndex, 1);
      await fs.writeFile(path, JSON.stringify(usersData, null, 2));
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Search id does not exist' }));
  }
}
