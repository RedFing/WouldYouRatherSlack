var admin = require("firebase-admin");

var serviceAccount = require("./would-you-rather-d023e-firebase-adminsdk-ik7h0-29b1ba9013.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://would-you-rather-d023e.firebaseio.com"
});


const getNextQuestionForUser = async (id) => {
  const user = await admin.firestore().collection('users').doc(id).get();

  let questionId;
  if (user.exists){
    questionId = user.data().nextQuestion.toString();
  }

  const question = await admin.firestore().collection('questions').doc(questionId).get();
  if (question.exists){
    return { answers: question.data().answers, id: questionId };
  } else {
    return { answers: null, id: null };
  }
  
}

const updateAndGetScoreForQuestion = async (id, answerText) => {
  const questionRef = admin.firestore().collection('questions').doc(id)
  const question = await questionRef.get();
  const questionAnswers = question.data().answers
                                  .map(answer => {
                                    // 
                                    if (answer.text == answerText){
                                      return { ...answer, count: answer.count + 1}
                                    }
                                    return answer;
                                  })
  
  
  questionRef.update({ answers: questionAnswers});
  return questionAnswers;
}

const updateUserAnswer = async (userId) => {
  await admin.firestore().collection('users')
                   .doc(userId)
                   .update({ nextQuestion: admin.firestore.FieldValue.increment(1)}, { merge: true })
}

module.exports = {
  updateAndGetScoreForQuestion,
  getNextQuestionForUser,
  updateUserAnswer,
}