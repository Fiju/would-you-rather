import * as services from "./_DATA";

export const getAllUsers = () => services._getUsers();

export const getAllQuestions = () => services._getQuestions();

export const saveQuestion = question => services._saveQuestion(question);

export const saveQuestionAnswer = data => services._saveQuestionAnswer(data);
