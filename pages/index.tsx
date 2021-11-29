import { NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DropdownButton, LinkButton, LinkLink } from '../components/Buttons';
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
import { getSessionCookie, removeCookie } from '../util/cookies';
import {
  findAllTopics,
  findProfile,
  findSession,
  findThreeLatestQuizResults,
  findUserById,
} from '../util/DB/findQueries';
import { checkDateOfQuiz, getPreviousQuizTitle } from '../util/quiz';
import { filterFavoriteTopics } from '../util/topics';

const PreviousQuizzesContainer = styled.div`
  max-width: 480px;
  height: fit-content;
  background-color: #ada7ff;
  border: 5px solid #212529;
  border-radius: 15px;
  overflow-x: hidden;
`;

const PreviousQuizContentContainer = styled.div`
  display: ${(props: { open: boolean }) => (props.open ? 'grid' : 'none')};
  grid-gap: 10px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-top: 5px solid #212529;
`;

interface HomeProps {
  userFavoriteTopics?: { file: string; title: string }[];
  userQuizzesResults?: {
    title: string;
    isCorrectlyAnswered: boolean[];
    keyword: string;
    date: Date;
  }[];
  foundUser: {} | undefined;
}

export default function Home({
  userFavoriteTopics,
  userQuizzesResults,
  foundUser,
}: HomeProps) {
  const [openAccordions, setOpenAccordions] = useState([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    removeCookie('userAnswers');
  }, []);
  return (
    <WideContainer>
      <PrimHeading>Dashboard</PrimHeading>
      {foundUser && (
        <>
          <ParaText>Explore your previous UX learning journey.</ParaText>
          <SecHeading data-cy="previous-quizzes">Previous Quizzes</SecHeading>
          {userQuizzesResults?.length !== 0 && (
            <PreviousQuizzesContainer>
              {userQuizzesResults?.map(
                (
                  quizResult: {
                    title: string;
                    date: Date;
                    isCorrectlyAnswered: boolean[];
                    keyword: string;
                  },
                  index: number,
                ) => {
                  return (
                    <div key={`${quizResult.title}-${index + 1}`}>
                      <DropdownButton
                        open={openAccordions[index]}
                        firstOfType={index === 0 ? true : false}
                        onClick={() =>
                          setOpenAccordions(
                            openAccordions.map((accordion, accordionIndex) =>
                              accordionIndex === index ? !accordion : false,
                            ),
                          )
                        }
                      >
                        {quizResult.title}
                      </DropdownButton>
                      <PreviousQuizContentContainer
                        open={openAccordions[index]}
                      >
                        <ParaText>
                          <BoldText>Status:</BoldText>
                          {quizResult.isCorrectlyAnswered.includes(false)
                            ? ' Not all questions were answered correctly last time.'
                            : ' All questions were answered correctly last time.'}
                        </ParaText>
                        <ParaText>
                          <BoldText>Last Attempt:</BoldText>{' '}
                          {checkDateOfQuiz(quizResult.date)}
                        </ParaText>
                        <Link href={`/results/${quizResult.keyword}`} passHref>
                          <LinkLink>View Results in Detail</LinkLink>
                        </Link>
                      </PreviousQuizContentContainer>
                    </div>
                  );
                },
              )}
            </PreviousQuizzesContainer>
          )}
          {userQuizzesResults?.length === 0 && (
            <ParaText>No quizzes done yet.</ParaText>
          )}
          <SecHeading>Favorite Topics</SecHeading>
          {userFavoriteTopics?.length !== 0 && (
            <TopicsContainer>
              {userFavoriteTopics?.map(
                (topic: { file: string; title: string }) => {
                  return (
                    <SingleTopicContainer key={topic.file}>
                      <Link href={`/topics/${topic.file}`} passHref>
                        <SingleTopicContainerLink>
                          <SecHeading data-cy="liked-topic-0">
                            {topic.title}
                          </SecHeading>
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
                },
              )}
            </TopicsContainer>
          )}
          {userFavoriteTopics?.length === 0 && (
            <ParaText>No favorite topics yet.</ParaText>
          )}
        </>
      )}
      {!userFavoriteTopics && (
        <>
          <ParaText>Please log in to use the dashboard.</ParaText>
          <ButtonContainer>
            <Link href="/auth/signin" passHref>
              <LinkButton>Log In</LinkButton>
            </Link>
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
  const sessionToken = getSessionCookie(context.req?.headers.cookie);

  if (sessionToken) {
    const validSession = await findSession(sessionToken);

    if (!validSession) {
      return {
        props: {},
      };
    }
    const foundUser = await findUserById(validSession.userId);
    const foundProfile = await findProfile(foundUser?._id.toString());

    const allTopics = await findAllTopics();
    // User Profile

    const userFavoriteTopics = filterFavoriteTopics(
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
        userFavoriteTopics,
        userQuizzesResults,
        foundUser,
      },
    };
  }
}
