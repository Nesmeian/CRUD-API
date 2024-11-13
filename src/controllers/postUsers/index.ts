import { User } from '..//..//tsInterfaces/index';
import getUsers from '../getUsers';
import fs from 'fs';
export default async function postUsers(
  path: string,
  chunkData: User,
): Promise<void> {
  const data = await getUsers(path);
  const users = data.map((e) => e.user);
  const dataMaxId = Math.max(...data.map((e) => e.id));
  if (users.indexOf(chunkData.user) === -1) {
    chunkData.id = dataMaxId + 1;
    data.push({ id: chunkData.id, user: chunkData.user });
    await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
  } else {
    console.error('Sorry this user is existed');
  }
}
