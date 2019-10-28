import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import Next from 'next';
import { App } from '@slack/bolt';
import { Application } from 'express';

dotenv.config();

export interface TaskProps {
  srv: Application;
  app: App;
}

const dev = process.env.NODE_ENV !== 'production';
const dir = dev ? path.join(__dirname, '..') : path.join(__dirname, '..', '..', 'app');

const next = Next({ dev, dir });

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

export default async (setup: (props: TaskProps) => Promise<void>) => {
  // create bolt instance
  const server = (await app.start(process.env.PORT)) as http.Server;

  // take out express instance from bolt
  const srv = server.listeners('request')[0] as Application;
  srv.use(helmet());
  const stacks = srv._router.stack;
  const helmetLayer = stacks.pop();
  srv._router.stack = [
    stacks[0], // query
    stacks[1], // init
    helmetLayer, // helmet
    ...stacks.slice(2), // last
  ];

  // setup next app
  await next.prepare();
  const handle = next.getRequestHandler();

  // assign next app handler
  srv.get('*', async (req, res) => {
    await handle(req, res);
  });

  return setup({ srv, app });
};
