const { App } = require('@slack/bolt');
const admin = require('firebase-admin');
const blockKits = require('./blockKits');
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const db = require('./db');

// The echo command simply echoes on command
app.command('/wyr', async ({ body, ack, say }) => {
  await ack();

  const { answers, id } = await db.getNextQuestionForUser(body.user_id);

  if (!answers){
    await say('Sorry, you played them all!')
  } else {
    const template = blockKits.createQuestionBlockKit(answers, id);

    await say(template);
  }
});

app.action('next', async ({ body, ack, say, respond}) => {
  await ack();

  const { answers, id } = await db.getNextQuestionForUser(body.user.id);

  if (!answers){
    await say('Sorry, you played them all!')
  } else {
    const template = blockKits.createQuestionBlockKit(answers, id);

    await respond({...template, replace_original: true});
  }
});

app.action('answer', async ({ body, ack, action, respond}) => {
  await ack();

  const [questionId, answerText] = action.block_id.split('_');
  const answers = await db.updateAndGetScoreForQuestion(questionId, answerText);

  db.updateUserAnswer(body.user.id);

  await respond(blockKits.createQuestionScoreBlockKit((answers)))
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();