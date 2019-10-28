import { TaskProps } from '../setup';

/**
 * Event Subscriptions
 * - Enable `Event Subscriptions` in your slack app setting.
 * - Enable with url like a `http://********.ngrok.io/slack/events`.
 * - And subscribe to bot events `message.channels`.
 * - See more: `https://slack.dev/bolt/ja-jp/tutorial/getting-started`
 */

export default ({ app }: TaskProps) => {
  app.message('hello', ({ message, say }) => {
    say(`Hey there <@${message.user}>!`);
  });
};
