interface Question {
  question: string;
  type: string;
  length: number;
  keys?: string[];
}

export const questions: Question[] = [
  {
    question: "What is your first name?",
    type: "string",
    length: 10,
  },
  {
    question: "What is your last name?",
    type: "string",
    length: 10,
  },
  {
    question: "Choose a username:",
    type: "string",
    length: 10,
  },
  {
    question: "What is your age?",
    type: "number",
    length: 2,
  },
  {
    question: "What are your email address []?",
    type: "array",
    length: 30,
  },
  {
    question:
      "What is your address {state: '', city: '', street: '', zipcode: ''}?",
    type: "object",
    length: 100,
    keys: ["state", "city", "street", "zipcode"],
  },
  {
    question: "What is your phone number?",
    type: "number",
    length: 10,
  },

  {
    question: "What is your website link?",
    type: "string",
    length: 20,
  },
  {
    question: "What are your hobbies?",
    type: "array",
    length: 41,
  },
];
