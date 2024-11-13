import fs from 'fs';
import { User } from '../../tsInterfaces/index';
export default async function getUsers(userDataPath: string): Promise<User[]> {
  const data = await fs.promises.readFile(userDataPath, { encoding: 'utf-8' });
  const users: User[] = JSON.parse(data);
  return users;
}
