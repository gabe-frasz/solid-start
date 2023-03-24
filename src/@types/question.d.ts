export type Question = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  selectedAnswer?: string;
};
