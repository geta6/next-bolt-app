import http from 'http';
import path from 'path';
import helmet from 'helmet';
import createNext from 'next';
import { App, LogLevel } from '@slack/bolt';
import { Application } from 'express';

export interface Props {
  srv: Application;
  app: App;
}

export default async (initialize: (props: Props) => Promise<void>) => {
  // setup next
  const dev = process.env.NODE_ENV !== 'production';
  const next = createNext({ dev, dir: dev ? path.join(__dirname, '..') : path.join(__dirname, '..', '..', 'app') });
  await next.prepare();
  const handle = next.getRequestHandler();
  console.log(`✅ next.js`); // eslint-disable-line

  // setup bolt
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    logLevel: LogLevel.WARN,
  });
  const server = (await app.start(process.env.PORT)) as http.Server;
  console.log(`✅ bolt`); // eslint-disable-line

  // extract express instance
  const srv = server.listeners('request')[0] as Application;
  srv.use(helmet(process.env.NODE_ENV === 'development' ? { contentSecurityPolicy: false } : {}));
  const stacks = srv._router.stack;
  const helmetLayer = stacks.pop();
  srv._router.stack = [stacks[0], stacks[1], helmetLayer, ...stacks.slice(2)];

  // initialize application
  initialize({ srv, app });

  // assign next app handler for fallback
  srv.get('*', async (req, res) => handle(req, res));

  // message
  console.log(`⚡️ Bolt app is running!`); // eslint-disable-line
};
