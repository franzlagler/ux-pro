import { NextPageContext } from 'next';
import { getSession, signIn, signOut } from 'next-auth/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';
import {
  DropdownButton,
  LinkButton,
  RegularButton,
} from '../components/Buttons';
import {
  ButtonContainer,
  ImageContainer,
  SingleTopicContainer,
  SingleTopicContainerLink,
  SingleTopicImageContainer,
  TopicsContainer,
  WideContainer,
} from '../components/ContainerElements';
import {
  ParaText,
  PrimHeading,
  SecHeading,
  TerHeading,
} from '../components/TextElements';
import { checkIfAnswersCorrect, removeCookie } from '../util/cookies';
import {
  filterTopics,
  findAllPreviousTopics,
  findProfile,
  findUser,
  getAllTopics,
  getPreviousQuizData,
} from '../util/dbQueries';

const PreviousQuizzesContainer = styled.div`
  max-width: 1000px;
  height: fit-content;
  border: 3px solid #212529;
  border-radius: 15px;
  overflow-x: hidden;
`;

const SinglePreviousQuizContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: #ada7ff;
  border-bottom: 2px solid #212529;
  border-radius: 2px;
  &:last-of-type {
    border-bottom: 0;
  }
`;

export default function Home({
  session,
  allTopics,
  filteredTopics,
  previousQuizData,
}) {
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
          {previousQuizData.length !== 0 && (
            <PreviousQuizzesContainer>
              {previousQuizData.map((el, index) => {
                return (
                  <DropdownButton key={`${el.title}-${index + 1}`}>
                    {el.title}
                  </DropdownButton>
                );
              })}
            </PreviousQuizzesContainer>
          )}
          {previousQuizData.length === 0 && (
            <ParaText>No quizzes done yet.</ParaText>
          )}
          <SecHeading>Favorite Topics</SecHeading>
          {filteredTopics.length !== 0 && (
            <TopicsContainer>
              {filteredTopics.map((topic) => {
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
          {filteredTopics.length === 0 && (
            <ParaText>No favorite topics yet.</ParaText>
          )}
        </>
      )}
      {!session && (
        <>
          <ParaText>Please login to use the dashboard.</ParaText>
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

    const user = await findUser(session?.user?.email);
    const { favoriteTopics } = await findProfile(
      user?._id.toString(),
      'favoriteTopics',
    );

    const filteredTopics = await filterTopics(allTopics, favoriteTopics);

    const { _id, results } = await findProfile(user._id.toString());
    const userId = _id.toString();

    const previousQuizData = await getPreviousQuizData(results, allTopics);

    return {
      props: { session, allTopics, filteredTopics, previousQuizData, userId },
    };
  }

  return {
    props: {},
  };
}
