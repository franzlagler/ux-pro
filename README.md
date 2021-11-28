# UX Pro (Learning Platform)

## Description

UX Pro is a full-stack application that enables developers to improve their knowledge about UX and accessiblity. Users can choose from a variety of topics. Each topic comes with a short text that tells essential aspects about the respective topic. Once the user thinks they have familiarized themselves enough with the content of the text, they can test their knowledge in a little quiz.

Each question within the quiz consists of 4 answers from which at least one is correct. Users can move from forth and back between questions if they want to make changes. After pressing the 'Finish' button, the answers of the user are being checked and the results will be displayed. If an a question has been answered entirely correct, there will be a tick beside the question. Moreover, each individual answers that has been answered correctly will also be highlighted.

If a user additionally also creates an account and logs in to it, the functionality increases even more: The three latest quiz results will be stored in the database and can be accessed on the dashboard. Furthermore, users can like their favorite topics which will then also appear on the dashboard.

[Test the app](ux-pro-learning-platform.herokuapp.com/)

## Technologies

- Next.js
- Typescript
- Redux Toolkit
- MongoDB
- Styled Components
- Jest unit tests
- Cypress E2E tests

## Setup

If you would like to set up the project yourself, follow these steps:

### MongoDB Atlas

- The application requires MongoDB Atlas in order to work.
- It is necessary to create have a [MongoDB Atlas account](https://account.mongodb.com/account/login) for that.
- Once your done with that, you need to create a new cluster if you don't have one yet.
- Stick to the [instructions of the official documentation](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/) to do that.
- Make sure to select a **shared database** as it is the only one that is for free.
- After having done all of the previous steps, you should see your cluster under Deployment/Databases.
- Click on 'Browse Collections'.
- Create a new database with a name you would like.
- Once you've created the database go back to the main page under Deployment/Databases.
- Click on 'Connect' and then click on 'Connect your application'.
- Copy the connection string starting with 'mongodb+srv...'. You will need it for the next step.

### Cloning the Project

- Clone the project using git clone.
- Add your project to your GitHub Profile.
- After you're done with that, open your code editor and terminal.
- Run yarn to install all the require dependencies.
- Generate a fake email account using [Ethereal](https://ethereal.email/). All topic proposals will be send to this email account.
- Create a .env.local file in the root directory.
- You need to declare four environment variables in there:
  - MONGODB_URI (with the value of the connection string you copied from MongoDB Atlas).
  - DB_Name (with the value of the name of the database you created within the cluster).
  - CYPRESS_TEST_EMAIL (with the value of a test user email that you would use for Cypress tests. Make sure to also create the respective account for that afterwards!).
  - CYPRESS_TEST_PASSWORD (with the value of a test user password that you would use for Cypress tests. Make sure to use the same user as for CYPRESS_TEST_EMAIL).
  - ETHEREAL_EMAIL (with the value of your Ethereal account Email).
  - ETHEREAL_PASSWORD (with the value of your Ethereal account password).
- Create a cypress.env.json file.
- You need to create a JSON object in there with the following two properties:
  - "test_email" with the same value as for CYPRESS_TEST_EMAIL
  - "test_password" with the same value as for CYPRESS_TEST_PASSWORD
- The next step is to migrate the default data (such as topics and questions) to the database.
- You can either do that manually or you can use the API route 'insertDefaultData' for that.
- In the latter case, you would need to call it by typing the respective path into your browser's address bar (e.g. 'http://localhost:3000/api/insertDefaultData').

## Gallery

### Landing Page

![Landing Page](/public/images/screenshots/topics_page.svg)
