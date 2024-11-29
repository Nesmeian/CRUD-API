import http from 'http';
import { postUser } from 'src/tsInterfaces';
export default async function parseData(
  reg: http.IncomingMessage,
): Promise<postUser> {
  return new Promise((resolve, reject): void => {
    let body = '';
    reg.on('data', (chunk) => {
      body += chunk;
    });
    reg.on('end', (): void => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}
