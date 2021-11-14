import { NextPageContext } from 'next';
import { getSession, signIn, signOut } from 'next-auth/client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  DropdownButton,
  LinkButton,
  LinkLink,
  RegularButton,
} from '../components/Buttons';
import {
  ButtonContainer,
  SingleTopicContainer,
  SingleTopicContainerLink,
  SingleTopicImageContainer,
  TopicsContainer,
  WideContainer,
} from '../components/ContainerElements';
import {
  BoldText,
  ParaText,
  PrimHeading,
  SecHeading,
} from '../components/TextElements';
import { removeCookie } from '../util/cookies';
import {
  findProfile,
  findThreeLatestQuizResults,
  getAllTopics,
} from '../util/DB/findQueries';
import { filterTopics, getPreviousQuizTitle } from '../util/dbQueries';

const PreviousQuizzesContainer = styled.div`
  max-width: 1000px;
  height: fit-content;
  background-color: #ada7ff;
  border: 3px solid #212529;
  border-radius: 15px;
  overflow-x: hidden;
`;

const PreviousQuizContentContainer = styled.div`
  display: ${(props: { open: boolean }) => (props.open ? 'grid' : 'none')};
  grid-gap: 10px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-top: 3px solid #212529;
`;

export default function Home({
  session,
  userFavoriteTopics,
  userQuizzesResults,
}) {
  const [openAccordions, setOpenAccordions] = useState([
    false,
    false,
    false,
    false,
  ]);

  const checkDateOfQuiz = (date) => {
    const [quizDay, quizMonth, quizYear] = date.split('/');

    const [currentDay, currentMonth, currentYear] = new Date()
      .toLocaleDateString()
      .split('/');
  };
  useEffect(() => {
    removeCookie('questionAnswers');
  }, []);
  return (
    <WideContainer>
      <PrimHeading>Dashboard</PrimHeading>
      {session && (
        <>
          <ParaText>Explore your previous UX learning journey.</ParaText>
          <SecHeading>Previous Quizzes</SecHeading>
          {userQuizzesResults.length !== 0 && (
            <PreviousQuizzesContainer>
              {userQuizzesResults.map(
                (el: { title: string }, index: number) => {
                  return (
                    <div key={`${el.title}-${index + 1}`}>
                      <DropdownButton
                        open={openAccordions[index]}
                        firstOfType={index === 0 ? true : false}
                        onClick={() =>
                          setOpenAccordions(
                            openAccordions.map((el, elIndex) =>
                              elIndex === index ? !el : false,
                            ),
                          )
                        }
                      >
                        {el.title}
                      </DropdownButton>
                      <PreviousQuizContentContainer
                        open={openAccordions[index]}
                      >
                        <ParaText>
                          <BoldText>Status:</BoldText>
                          {el.isCorrectlyAnswered.includes(false)
                            ? ' Not all questions were answered correctly last time.'
                            : ' All questions were answered correctly last time.'}
                        </ParaText>
                        <ParaText>
                          <BoldText>Last Attempt:</BoldText> More than three
                          days ago.
                        </ParaText>
                        <Link href={`/results/${el.keyword}`} passHref>
                          <LinkLink>View Results in Detail</LinkLink>
                        </Link>
                      </PreviousQuizContentContainer>
                    </div>
                  );
                },
              )}
            </PreviousQuizzesContainer>
          )}
          {userQuizzesResults.length === 0 && (
            <ParaText>No quizzes done yet.</ParaText>
          )}
          <SecHeading>Favorite Topics</SecHeading>
          {userFavoriteTopics.length !== 0 && (
            <TopicsContainer>
              {userFavoriteTopics.map((topic) => {
                return (
                  <SingleTopicContainer key={topic.file}>
                    <Link href={`/topics/${topic.file}`} passHref>
                      <SingleTopicContainerLink>
                        <SecHeading>{topic.title}</SecHeading>
                        <SingleTopicImageContainer>
                          <Image
                            src={`/images/${topic.file}-1.svg`}
                            layout="fill"
                          />
                        </SingleTopicImageContainer>
                      </SingleTopicContainerLink>
                    </Link>
                  </SingleTopicContainer>
                );
              })}
            </TopicsContainer>
          )}
          {userFavoriteTopics.length === 0 && (
            <ParaText>No favorite topics yet.</ParaText>
          )}
        </>
      )}
      {!session && (
        <>
          <ParaText>Please log in to use the dashboard.</ParaText>
          <ButtonContainer>
            {' '}
            <RegularButton onClick={() => signIn()}>Log In</RegularButton>
            <Link href="/auth/signup" passHref>
              <LinkButton purple>Register</LinkButton>
            </Link>
          </ButtonContainer>
        </>
      )}
    </WideContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });

  if (session) {
    const allTopics = await getAllTopics();

    const user = session.user;

    const foundProfile = await findProfile(user?._id);

    const userFavoriteTopics = await filterTopics(
      allTopics,
      foundProfile?.favoriteTopics,
    );

    const previousQuizzesTitle = await getPreviousQuizTitle(
      foundProfile?.results,
      allTopics,
    );

    const userQuizzesResults = await findThreeLatestQuizResults(
      foundProfile?._id.toString(),
      foundProfile?.results,
      previousQuizzesTitle,
    );

    return {
      props: {
        session,
        userFavoriteTopics,
        userQuizzesResults,
      },
    };
  }

  return {
    props: {},
  };
}
