import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import Next from 'next';
import { App, LogLevel } from '@slack/bolt';
import { Application } from 'express';

dotenv.config();

export interface Props {
  srv: Application;
  app: App;
}

export default async (setup: (props: Props) => Promise<void>) => {
  // setup next
  const dev = process.env.NODE_ENV !== 'production';
  const next = Next({ dev, dir: dev ? path.join(__dirname, '..') : path.join(__dirname, '..', '..', 'app') });
  await next.prepare();
  const handle = next.getRequestHandler();

  // setup bolt
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    logLevel: LogLevel.WARN,
  });
  const server = (await app.start(process.env.PORT)) as http.Server;

  // extract express instance
  const srv = server.listeners('request')[0] as Application;
  srv.use(helmet());
  const stacks = srv._router.stack;
  const helmetLayer = stacks.pop();
  srv._router.stack = [stacks[0], stacks[1], helmetLayer, ...stacks.slice(2)];

  // assign next app handler
  srv.get('*', async (req, res) => handle(req, res));

  // message
  process.stdout.write(`⚡️ Bolt app is running!\n`);

  return setup({ srv, app });
};
