import { NextPageContext } from 'next';
import { getSession, signIn, signOut } from 'next-auth/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';
import { LinkButton, RegularButton } from '../components/Buttons';
import {
  ButtonContainer,
  ImageContainer,
  SingleTopicContainer,
  SingleTopicContainerLink,
  SingleTopicImageContainer,
  TopicsContainer,
  WideContainer,
} from '../components/ContainerElements';
import { ParaText, PrimHeading, SecHeading } from '../components/TextElements';
import { removeCookie } from '../util/cookies';
import {
  filterTopics,
  findAllPreviousTopics,
  findProfile,
  findUser,
  getAllTopics,
} from '../util/dbQueries';

export default function Home({ session, allTopics, filteredTopics }) {
  useEffect(() => {
    removeCookie('questionAnswers');
  }, []);
  return (
    <WideContainer>
      <PrimHeading>Dashboard</PrimHeading>
      {session && (
        <>
          <ParaText>Explore your previous UX learning journey.</ParaText>
          <SecHeading>Previous Topics</SecHeading>
          <ParaText>No previous topics yet.</ParaText>
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

    const { _id } = await findProfile(user._id.toString(), '_id');

    const previousTopics = await findAllPreviousTopics(_id.toString());
    console.log(previousTopics);

    return {
      props: { session, allTopics, filteredTopics },
    };
  }

  return {
    props: {},
  };
}
