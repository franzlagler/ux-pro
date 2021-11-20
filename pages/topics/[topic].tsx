import Markdown from 'markdown-to-jsx';
import { NextPageContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  LikeButton,
  LinkButton,
  SocialMediaButton,
} from '../../components/Buttons';
import {
  ButtonContainer,
  CenteredButtonContainer,
  CodeBlock,
  ImageContainer,
  NarrowContainer,
} from '../../components/ContainerElements';
import {
  InvisibleHeading,
  ParaText,
  PrimHeading,
  SecHeading,
} from '../../components/TextElements';
import { getSessionCookie, removeCookie } from '../../util/cookies';
import { findProfile, findSession, findTopic } from '../../util/DB/findQueries';
import { checkIfTopicLiked, fetchTopicData } from '../../util/topics';

type TopicProps = {
  content: string;
  foundTopic: {
    title: string;
    file: string;
    topicNumber: number;
  };
  isTopicLiked?: boolean;
  foundProfile?: { userId: string };
};

export default function Topic({
  content,
  foundTopic,
  isTopicLiked,
  foundProfile,
}: TopicProps) {
  const [likeTopic, setLikeTopic] = useState(isTopicLiked);

  const handleLikeClick = async () => {
    setLikeTopic(!isTopicLiked);
    await fetch('/api/updateLikedTopics', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topicNumber: foundTopic.topicNumber,
        userId: foundProfile?.userId,
      }),
    });
  };
  useEffect(() => {
    removeCookie('userAnswers');
  }, []);

  return (
    <NarrowContainer>
      <CenteredButtonContainer>
        <LinkButton href="/topics" purple>
          <Image src="/images/arrow.svg" width="20px" height="20px" />{' '}
          &nbsp;Back
        </LinkButton>
      </CenteredButtonContainer>

      <PrimHeading>{foundTopic.title}</PrimHeading>
      <ButtonContainer>
        <LikeButton liked={likeTopic} onClick={handleLikeClick} />
        <Link href="https://twitter.com/intent/tweet" passHref>
          <SocialMediaButton url="/images/twitter.svg" />
        </Link>
        <SocialMediaButton url="/images/linkedin.svg" />
      </ButtonContainer>
      <ImageContainer>
        <Image
          src={`/images/${foundTopic.file}-1.svg`}
          layout="fill"
          objectFit="cover"
        />
      </ImageContainer>
      <Markdown
        options={{
          overrides: {
            h1: {
              component: InvisibleHeading,
            },
            h2: {
              component: SecHeading,
            },
            p: {
              component: ParaText,
            },
            code: {
              component: CodeBlock,
            },
          },
        }}
      >
        {content}
      </Markdown>
      <CenteredButtonContainer>
        <LinkButton
          href={`/quizzes/${foundTopic.file}-${foundTopic.topicNumber}-1`}
        >
          Start Quiz
        </LinkButton>
      </CenteredButtonContainer>
    </NarrowContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const keyword = context.query.topic;

  if (typeof keyword === 'string') {
    const foundTopic = await findTopic('file', keyword);

    if (!foundTopic) {
      return {
        redirect: {
          destination: '/topics',
          permanent: false,
        },
      };
    }

    const content = await fetchTopicData(keyword);

    const currentSessionToken = getSessionCookie(context.req?.headers.cookie);
    const validSession = await findSession(currentSessionToken);

    if (validSession) {
      const foundProfile = await findProfile(validSession.userId);

      const isTopicLiked = await checkIfTopicLiked(
        foundProfile?.favoriteTopics,
        foundTopic.topicNumber,
      );

      return {
        props: {
          content,
          foundTopic,
          isTopicLiked,
          foundProfile,
        },
      };
    } else {
      return { props: { foundTopic, content } };
    }
  }
}
