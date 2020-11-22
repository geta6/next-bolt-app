import path from 'path';
import { loadEnvConfig } from '@next/env';
import ngrok from 'ngrok';

loadEnvConfig(path.resolve('app'));

(async () => {
  // setup ngrok
  if (process.env.NODE_ENV === 'development') {
    const options: ngrok.INgrokOptions = {
      addr: process.env.PORT,
      ...(process.env.DEV_NGROK_SUBDOMAIN ? { subdomain: process.env.DEV_NGROK_SUBDOMAIN } : {}),
    };
    const info = await ngrok.connect(options);
    console.log(`✅ ngrok:`); // eslint-disable-line
    console.log(` \`- Endpoint: ${info}/slack/events`); // eslint-disable-line
  }
})();
