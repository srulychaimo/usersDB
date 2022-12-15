interface Question {
  question: string;
  type: string;
  key: string;
  keys?: string[];
}

export const questions: Question[] = [
  {
    question: "What is your first name?",
    type: "string",
    key: "firstName",
  },
  {
    question: "What is your last name?",
    type: "string",
    key: "lastName",
  },
  {
    question: "Choose a username:",
    type: "string",
    key: "username",
  },
  {
    question: "What is your age?",
    type: "number",
    key: "age",
  },
  {
    question: "What are your email address []?",
    type: "array",
    key: "emails",
  },
  {
    question:
      "What is your address {state: '', city: '', street: '', zipcode: ''}?",
    type: "object",
    key: "address",
    keys: ["state", "city", "street", "zipcode"],
  },
  {
    question: "What is your phone number?",
    type: "number",
    key: "phone",
  },

  {
    question: "What is your website link?",
    type: "string",
    key: "website",
  },
  {
    question: "What are your hobbies?",
    type: "array",
    key: "hobbies",
  },
];
