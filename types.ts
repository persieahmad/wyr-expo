export type QuestionOption = {
    A: string;
    B: string;
  };
  
  export type Question = {
    question: string;
    options: QuestionOption;
  };
  
  export type Answer = 'A' | 'B';
  
  export type FetchedQuestion = {
    question: string;
    options: {
      A: string;
      B: string;
    };
  };
  