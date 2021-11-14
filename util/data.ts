export const defaultTopics = [
  {
    topicNumber: 1,
    title: 'Create accessible buttons',
    date: new Date().toLocaleDateString(),
    author_id: 1,
    file: 'accessible-buttons',
  },
  {
    topicNumber: 2,
    title: 'Excel at making forms',
    date: new Date().toLocaleDateString(),
    author_id: 1,
    file: 'excel-at-forms',
  },
  {
    topicNumber: 3,
    title: 'Animate like a pro',
    date: new Date().toLocaleDateString(),
    author_id: 1,
    file: 'pro-animations',
  },
  {
    topicNumber: 4,
    title: 'Getting that font right',
    date: new Date().toLocaleDateString(),
    author_id: 1,
    file: 'getting-font-right',
  },
];

export const quizQuestions = [
  {
    topicNumber: 1,
    keyword: 'accessible-buttons-1-1',
    question: 'Why is the shown button not ideal?',
    answer1: 'It is too small.',
    answer2: 'Red is a bad background color for a delete button.',
    answer3: 'The button is actually an anchor tag.',
    answer4: 'There is no aria-label.',
    correctAnswers: [true, false, true, false],
  },
  {
    topicNumber: 1,
    keyword: 'accessible-buttons-1-2',
    question:
      'What should definitely be improved about the button in the shown notification?',
    answer1: 'It should be given a more meaningful label.',
    answer2: 'It should be positioned at the very top.',
    answer3: 'It should be made smaller.',
    answer4: 'It should have no border.',
    correctAnswers: [true, false, false, false],
  },
  {
    topicNumber: 1,
    keyword: 'accessible-buttons-1-3',
    question: 'What is problematic about the styling of the shown button?',
    answer1: 'No class was used for the styling.',
    answer2: 'Its pseudo class :focus was changed.',
    answer3: 'The outline property was removed from the pseudo class',
    answer4: 'They changed the color property of the button',
    correctAnswers: [false, false, true, false],
  },
  {
    topicNumber: 2,
    keyword: 'excel-at-forms-2-1',
    question: 'What should definitely be improved about the shown form?',
    answer1: 'Placeholders should not be used as labels.',
    answer2: 'Gender should not be a text input.',
    answer3: 'The submit button should be smaller.',
    answer4: 'First and last name should be separated.',
    correctAnswers: [true, true, false, false],
  },
  {
    topicNumber: 2,
    keyword: 'excel-at-forms-2-2',
    question: 'Why is the shown error message not optimal?',
    answer1: 'It is in red.',
    answer2: 'It does not tell what has gone wrong.',
    answer3: 'It does not tell what fields it is referring to.',
    answer4: 'It is placed at the very bottom.',
    correctAnswers: [false, true, true, true],
  },
  {
    topicNumber: 2,
    keyword: 'excel-at-forms-2-3',
    question: 'What are the positive aspects about the shown form?',
    answer1: 'Related fields have been grouped.',
    answer2: 'Meaningful labels are used.',
    answer3: 'Placeholders clarify the required data.',
    answer4: 'All fields are aligned.',
    correctAnswers: [true, true, true, true],
  },
  {
    topicNumber: 3,
    keyword: 'pro-animations-3-1',
    question:
      'In which of the following scenarious are animations properly used?',
    answer1:
      'A progress bar is being used to show the percentage of data being downloaded.',
    answer2:
      'The main heading of an application is constantly spinning to draw attention.',
    answer3: 'A video with flashy effects is being used as a hero header.',
    answer4:
      'A skeleton loader is being used to indicate that some content needs more loading time.',
    correctAnswers: [true, false, false, true],
  },
  {
    topicNumber: 3,
    keyword: 'pro-animations-3-2',
    question:
      'Why should you not use linear animations when it comes to motion?',
    answer1:
      "Linear Animations don't draw as much attention as other forms of animations.",
    answer2:
      'Linear Animations are harder to follow than other forms of animations.',
    answer3: 'Linear Animations display motion in an artificial manner.',
    answer4: 'Linear animated motions are harder to process for a computer.',
    correctAnswers: [false, false, true, false],
  },
  {
    topicNumber: 3,
    keyword: 'pro-animations-3-3',
    question: 'Which of the following statements are false?',
    answer1:
      'The perfect duration for an animation is around 4 seconds on every device.',
    answer2:
      'Ease-out animations are typically used for incoming notifications.',
    answer3:
      'Making your animation flashy is generally a good idea as it draws attention to your application.',
    answer4: 'The more animations there are, the greater the accessibility.',
    correctAnswers: [false, true, false, false],
  },
  {
    topicNumber: 4,
    keyword: 'getting-font-right-4-1',
    question: 'What should definitely be improved about the shown text?',
    answer1:
      'Headings and paragraphs should be given different font sizes and weights.',
    answer2: 'Paragraph texts should be left-aligned.',
    answer3: 'Paragraph texts should be justified.',
    answer4: 'Line Spacing should be increased.',
    correctAnswers: [true, true, false, true],
  },
  {
    topicNumber: 4,
    keyword: 'getting-font-right-4-2',
    question: 'Which of the following statements are true?',
    answer1: 'No matter the device, all texts should have a font size of 16px.',
    answer2: 'On smaller devices, you should have larger fonts.',
    answer3: 'The perfect font size depends on the device',
    answer4:
      'There is no general recommendation for what the minimum size of a text should be',
    correctAnswers: [false, false, true, false],
  },
  {
    topicNumber: 4,
    keyword: 'getting-font-right-4-3',
    question: 'What statements about fonts are true?',
    answer1:
      'If the application should look professional, you should definitely go for a sans-serif font.',
    answer2:
      'The type of font should match the overall theme of the application.',
    answer3: 'The font should be readable on all screens.',
    answer4:
      'Sans-serif fonts should not be used if your application has generally a modern theme.',
    correctAnswers: [false, true, true, false],
  },
];