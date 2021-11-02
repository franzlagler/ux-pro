import { connectToDatabase } from './mongodb';

const defaultTopics = [
  {
    _id: 1,
    title: 'Create accessible buttons',
    date: new Date().toLocaleDateString(),
    author_id: 1,
    file: 'accessible-buttons',
  },
  {
    _id: 2,
    title: 'Excel at making forms',
    date: new Date().toLocaleDateString(),
    author_id: 1,
    file: 'excel-at-forms',
  },
  {
    _id: 3,
    title: 'Animate like a pro',
    date: new Date().toLocaleDateString(),
    author_id: 1,
    file: 'pro-animations',
  },
  {
    _id: 4,
    title: 'Getting that font right',
    date: new Date().toLocaleDateString(),
    author_id: 1,
    file: 'getting-font-right',
  },
];

const quizQuestions = [
  {
    _id: 1,
    topic_id: 1,
    question: 'Why is the shown button not ideal?',
    answer1: 'It is too small.',
    answer2: 'Red is a bad background color for a delete button.',
    answer3: 'They used an anchor tag.',
    answer4: 'There is no aria-label.',
    correctAnswers: ['answer1', 'answer3'],
  },
  {
    _id: 2,
    topic_id: 1,
    question:
      'What should definitely be improved about the shown button in this notification?',
    answer1: 'It should be given a more meaningful label.',
    answer2: 'It should be positioned at the very top.',
    answer3: 'It should be made smaller.',
    answer4: 'It should have no border.',
    correctAnswers: ['answer1'],
  },
  {
    _id: 3,
    topic_id: 1,
    question: 'What is problematic about the styling of the shown button?',
    answer1: 'No class was used for the styling.',
    answer2: 'Its pseudo class :focus was changed.',
    answer3: 'The outline property was removed from the pseudo class',
    answer4: 'They changed the color property of the button',
    correctAnswers: ['answer3'],
  },
  {
    _id: 4,
    topic_id: 2,
    question: 'What should definitely be improved about the shown form?',
    answer1: 'Placeholders should not be used as labels.',
    answer2: 'Gender should not be a text input.',
    answer3: 'The submit button should be smaller.',
    answer4: 'First and last name should be separated.',
    correctAnswers: ['answer1', 'answer2'],
  },
  {
    _id: 5,
    topic_id: 2,
    question: 'Why is the shown error message not optimal?',
    answer1: 'It is in red.',
    answer2: 'It does not tell what has gone wrong.',
    answer3: 'It does not tell what fields it is referring to.',
    answer4: 'It is placed at the very bottom.',
    correctAnswers: ['answer2', 'answer3', 'answer4'],
  },
  {
    _id: 6,
    topic_id: 2,
    question: 'What are the positive aspects about the shown form?',
    answer1: 'Related fields have been grouped.',
    answer2: 'Meaningful labels are used.',
    answer3: 'Placeholders clarify the required data.',
    answer4: 'All fields are aligned.',
    correctAnswers: ['answer1', 'answer2', 'answer3', 'answer4'],
  },
  {
    _id: 7,
    topic_id: 3,
    question:
      'In which of the following scenarious would you say are animations properly used?',
    answer1:
      'A progress bar is being used to show the percentage of data being downloaded.',
    answer2:
      'The main heading of an application is constantly spinning to draw attention.',
    answer3:
      'A video with lots of flashy effects is being used as a hero header.',
    answer4:
      'A skeleton loader is being used to indicate that some content needs more loading time.',
    correctAnswers: ['answer1', 'answer4'],
  },
  {
    _id: 8,
    topic_id: 3,
    question:
      'Why should you not use linear animation when it comes to motion?',
    answer1:
      "Linear Animations don't draw as much attention as other forms of animations.",
    answer2:
      'Linear Animations are harder to follow than other forms of animations.',
    answer3: 'Linear Animations display motion in an artificial manner.',
    answer4: 'Linear animated motions are harder to process for a computer.',
    correctAnswers: ['answer3'],
  },
  {
    _id: 9,
    topic_id: 3,
    question: 'Which of the following statements are false?',
    answer1:
      'The perfect duration for an animation is around 4 seconds on every device.',
    answer2:
      'Ease-out animations are typically used for incoming notifications.',
    answer3:
      'Making your animation flashy is generally a good idea as it draws attention to your application.',
    answer4: 'The more animations there are, the greater the accessibility.',
    correctAnswers: ['answer1', 'answer3', 'answer4'],
  },
  {
    _id: 10,
    topic_id: 4,
    question: 'What should definitely be improved about the displayed text',
    answer1:
      'Headings and paragraphs should be given different sizes and weights.',
    answer2: 'Paragraph text should be left-aligned.',
    answer3: 'Paragraph text should be justified.',
    answer4: 'Line Spacing should be increased.',
    correctAnswers: ['answer1', 'answer2', 'answer4'],
  },
  {
    _id: 11,
    topic_id: 4,
    question: 'Which of the following statements are true?',
    answer1: 'No matter the device, all texts should have a font size of 16px.',
    answer2: 'On smaller devices, you should have larger fonts.',
    answer3: 'The perfect font size depends on the device',
    answer4:
      'There is no general recommendation for what the minimum size of a text should be',
    correctAnswers: ['answer3'],
  },
  {
    _id: 12,
    topic_id: 4,
    question: 'What statements are true about fonts?',
    answer1:
      'If the application should look professional, you should definitely go for a sans-serif font.',
    answer2:
      'The type of font should match the overall theme of the application.',
    answer3: 'The font should be readable on all screens.',
    answer4:
      'Sans-serif fonts should not be used if your application has generally a modern theme.',
    correctAnswers: ['answer2', 'answer3'],
  },
];

export async function updateDatabase() {
  const { db } = await connectToDatabase();
  await db.collection('topics').insertMany(defaultTopics);
}
