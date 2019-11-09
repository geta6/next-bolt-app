import { Props } from '../setup';

/**
 * Interactive Components
 * - Enable `Interactive Components` in your slack app setting.
 * - Enable with url like a `http://********.ngrok.io/slack/events`.
 * - See more: `https://slack.dev/bolt/concepts`
 */

export default ({ app }: Props) => {
  // Message listener
  app.message('button', ({ message, say }) => {
    say({
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
  app.action('button_click', ({ body, ack, say }) => {
    ack(); // Acknowledge the action
    say(`<@${body.user.id}> clicked the button`);
  });
};
