import Markdown from 'markdown-to-jsx';
import { NextPageContext } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';
import { LinkButton, RegularButton } from '../../components/Buttons';
import {
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
import { connectToDatabase } from '../../util/mongodb';
import fetchTopicData from '../../util/topicData';

export default function Topic(props: {
  foundTopic: { title: string; file: string };
  content: string;
  firstQuestion: { keyword: string };
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    removeCookie('questionAnswers');
  }, []);

  return (
    <NarrowContainer>
      <LinkButton href="/topics" purple>
        <Image src="/images/arrow.svg" width="20px" height="20px" /> &nbsp;Back
      </LinkButton>
      <PrimHeading>{props.foundTopic.title}</PrimHeading>
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
      <LinkButton href={`/quizzes/${props.firstQuestion.keyword}`}>
        Start Quiz
      </LinkButton>
    </NarrowContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const keyword = context.query.topic;
  const { db } = await connectToDatabase();
  const query1 = await db
    .collection('topics')
    .find({ file: keyword })
    .toArray();

  if (query1.length === 0) {
    return {
      redirect: {
        destination: '/topics',
        permanent: false,
      },
    };
  }
  const content = await fetchTopicData(keyword);

  const foundTopic = query1[0];

  const query2 = await db
    .collection('questions')
    .find({ topic_id: foundTopic._id })
    .toArray();

  const firstQuestion = query2[0];
  return {
    props: { content, foundTopic, firstQuestion },
  };
}
