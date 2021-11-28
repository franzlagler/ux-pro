import Markdown from 'markdown-to-jsx';
import { NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  LikeButton,
  LinkButton,
  RegularButton,
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
  BoldText,
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
  foundProfile?: { userId: string; showInstructions: boolean };
  url: string;
};

const PopupContainer = styled.div`
  display: ${(props: { open: boolean }) => (props.open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;

  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  /* For Firefox and older browsers */
  @supports (not (backdrop-filter: blur(30px))) and
    (not (-webkit-backdrop-filter: blur(30px))) {
    background-color: #00000090;
  }
`;

const PopupContentContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  border: 5px solid #212529;
  border-radius: 15px;
  @media (max-width: 900px) {
    position: absolute;
    top: calc(56%);
    width: 90%;
    height: fit-content;
    padding: 20px;
    overflow-x: auto;
    overflow-y: auto;
  }
`;

const ShowInstructionsContainer = styled.div`
  display: grid;
  grid-template-columns: 35px 1fr;
  grid-template-rows: 1fr;
  grid-gap: 5px;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props: { backgroundColor?: string }) =>
    props.backgroundColor};
  border-radius: 5px;
`;

const ShowInstructionsText = styled.p`
  font-size: 20px;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 25px;
  height: 25px;
  border: 5px solid #212529;
  border-radius: 3px;

  &:checked {
    background: url('/images/check.svg') no-repeat center;
  }
`;

const MarkdownContainer = styled(Markdown)``;

export default function Topic({
  content,
  foundTopic,
  isTopicLiked,
  foundProfile,
  url,
}: TopicProps) {
  const [likeTopic, setLikeTopic] = useState(() => {
    if (isTopicLiked) return isTopicLiked;
    return false;
  });
  const [tickedNoFutureInstructions, setTickedNoFutureInstructions] =
    useState(false);
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [noScroll, setNoScroll] = useState(false);
  console.log(router.pathname);

  const handleLikeClick = async () => {
    setLikeTopic(!likeTopic);
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

  const handleStartQuizClick = () => {
    if (foundProfile?.showInstructions) {
      setNoScroll(true);
      setOpenPopup(!openPopup);
      return;
    }

    router.push(`/quizzes/${foundTopic.file}-${foundTopic.topicNumber}-1`);
  };

  const handleProceedToQuizClick = async () => {
    if (tickedNoFutureInstructions) {
      await fetch('/api/updateShowInstructions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tickedNoFutureInstructions),
      });
    }
    setOpenPopup(false);
    router.push(`/quizzes/${foundTopic.file}-${foundTopic.topicNumber}-1`);
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
        {foundProfile && (
          <LikeButton
            liked={likeTopic}
            onClick={handleLikeClick}
            data-cy="like-button"
          />
        )}
        <Link href={`https://twitter.com/intent/tweet?url=${url}`} passHref>
          <SocialMediaButton url="/images/twitter.svg" />
        </Link>
      </ButtonContainer>
      <ImageContainer>
        <Image
          src={`/images/${foundTopic.file}-1.svg`}
          layout="fill"
          objectFit="cover"
        />
      </ImageContainer>
      <MarkdownContainer
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
      </MarkdownContainer>
      <CenteredButtonContainer>
        <RegularButton
          data-cy="start-quiz-button"
          center
          onClick={handleStartQuizClick}
        >
          Start Quiz
        </RegularButton>
      </CenteredButtonContainer>
      <PopupContainer open={openPopup}>
        <PopupContentContainer>
          <SecHeading>How does the quiz work?</SecHeading>
          <ParaText>
            In the following, you will be confronted with a series of questions
            that will test your knowledge about the text you read.{' '}
          </ParaText>
          <ParaText>
            {' '}
            For each question, there are{' '}
            <BoldText>four possible answers</BoldText> you can choose from. The
            amount of correct answers differs from question to question. There
            is, however, <BoldText>at least one correct answer</BoldText> per
            question.
          </ParaText>
          <ShowInstructionsContainer>
            <Checkbox
              type="checkbox"
              onChange={() => setTickedNoFutureInstructions(true)}
            />
            <ShowInstructionsText>
              Don't show the instructions again.
            </ShowInstructionsText>
          </ShowInstructionsContainer>
          <RegularButton center onClick={handleProceedToQuizClick}>
            Proceed to quiz
          </RegularButton>
        </PopupContentContainer>
      </PopupContainer>
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
    const url = `https://${context.req?.headers.host}${context.req?.url}`;

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
          url,
        },
      };
    } else {
      return { props: { foundTopic, content, url } };
    }
  }
}
