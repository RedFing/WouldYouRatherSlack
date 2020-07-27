const createQuestionBlockKit = ([answerA, answerB], id) => {
  return {
    "attachments": [
      {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Would you rather:*"
            }
          },
          {
            "type": "actions",
            "block_id": `${id}_${answerA.text}`,
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": `${answerA.text}`,
                  "emoji": true
                },
                "value": "click_me_123",
                "action_id": `answer`
              }
            ]
          },
          {
            "type": "actions",
            "block_id": `${id}_${answerB.text}`,
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": `${answerB.text}`,
                  "emoji": true
                },
                "value": "click_me_123",
                "action_id": `answer`
              }
            ]
          }
        ]
      }
    ]
  };
};

const createQuestionScoreBlockKit = ([answerA, answerB]) => {
  const percentageA = ((answerA.count)/(answerA.count+answerB.count)*100).toFixed(2);
  const percentageB = (100 - percentageA).toFixed(2);
  console.log(answerA);
  return {
    "attachments": [
      {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Team scores: "
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `${answerA.text} - ${percentageA}%`
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `${answerB.text} - ${percentageB}%`
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Next",
                  "emoji": true
                },
                "value": "click_me_123",
                "action_id": `next`
              }
            ]
          }
        ]
      }
    ]
  }
}

module.exports = {
  createQuestionBlockKit,
  createQuestionScoreBlockKit,
}
