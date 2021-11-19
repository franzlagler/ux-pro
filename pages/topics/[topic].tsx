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
import { removeCookie } from '../../util/cookies';
import { findProfile, findTopic, findUser } from '../../util/DB/findQueries';
import { checkIfTopicLiked, fetchTopicData } from '../../util/topics';

interface ExtendedSessionType extends Session {
  user?: {
    _id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

type TopicProps = {
  content: string;
  foundTopic: {
    title: string;
    file: string;
    topicNumber: number;
  };
  isLiked: boolean;
  userId: string;
  session?: {
    user: {
      name?: string | null;
      email?: string | undefined;
      image?: string | undefined;
    };
  };
};

export default function Topic(props: TopicProps) {
  const [isLiked, setIsLiked] = useState(props.isLiked);

  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    await fetch('/api/updateLikedTopics', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topicNumber: props.foundTopic.topicNumber,
        session: props.session,
        userId: props.userId,
      }),
    });
  };
  useEffect(() => {
    removeCookie('questionAnswers');
  }, []);

  return (
    <NarrowContainer>
      <CenteredButtonContainer>
        <LinkButton href="/topics" purple>
          <Image src="/images/arrow.svg" width="20px" height="20px" />{' '}
          &nbsp;Back
        </LinkButton>
      </CenteredButtonContainer>

      <PrimHeading>{props.foundTopic.title}</PrimHeading>
      <ButtonContainer>
        <LikeButton liked={isLiked} onClick={handleLikeClick} />
        <Link href="https://twitter.com/intent/tweet" passHref>
          <SocialMediaButton url="/images/twitter.svg" />
        </Link>
        <SocialMediaButton url="/images/linkedin.svg" />
      </ButtonContainer>
      <ImageContainer>
        <Image
          src={`/images/${props.foundTopic.file}-1.svg`}
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
        {props.content}
      </Markdown>
      <CenteredButtonContainer>
        <LinkButton
          href={`/quizzes/${props.foundTopic.file}-${props.foundTopic.topicNumber}-1`}
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

    const session: ExtendedSessionType | null = await getSession({
      req: context.req,
    });

    const user = await findUser(session?.user?._id);

    const userId = user?._id.toString();

    const profile = await findProfile(userId);

    const isLiked = await checkIfTopicLiked(
      profile?.favoriteTopics,
      foundTopic.topicNumber,
    );

    return {
      props: {
        content,
        foundTopic,
        isLiked,
        userId,
        session,
      },
    };
  }
}
