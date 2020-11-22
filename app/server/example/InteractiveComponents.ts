import { Props } from '../setup';

/**
 * Interactive Components
 * - Enable `Interactive Components` in your slack app setting.
 * - Enable with url like a `http://********.ngrok.io/slack/events`.
 * - See more: `https://slack.dev/bolt/concepts`
 */

export default ({ app }: Props) => {
  // Message listener
  app.message('button', async ({ message, say }) => {
    await say({
      channel: 'a',
      text: 'a',
      blocks: [
        {
          block_id: '1',
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hey there <@${message.user}>!`,
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
            },
            action_id: 'button_click',
          },
        },
      ],
    });
  });

  // Interaction responder
  app.action('button_click', async ({ body, ack, say }) => {
    ack(); // Acknowledge the action
    await say(`<@${body.user.id}> clicked the button`);
  });
};
