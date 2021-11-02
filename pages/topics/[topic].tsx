import { NextPageContext } from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { LinkButton } from '../../components/Buttons';
import {
  CodeBlock,
  ImageContainer,
  NarrowContainer,
} from '../../components/ContainerElements';
import {
  ParaText,
  PrimHeading,
  SecHeading,
} from '../../components/TextElements';
import { connectToDatabase } from '../../util/mongodb';
import fetchTopicData from '../../util/topicData';

export default function topic(props: {
  foundTopic: { title: string; file: string };
  content: string;
}) {
  return (
    <NarrowContainer>
      <LinkButton href="/topics" purple>
        <Image src="/images/arrow.svg" width="20px" height="20px" /> &nbsp;Back
      </LinkButton>
      <PrimHeading>{props.foundTopic.title}</PrimHeading>
      <ImageContainer>
        <Image
          src={`/images/${props.foundTopic.file}-1.png`}
          layout="fill"
          objectFit="cover"
        />
      </ImageContainer>

      <ReactMarkdown
        components={{
          h1: ({ children }) => <PrimHeading>{children}</PrimHeading>,
          h2: ({ children }) => <SecHeading>{children}</SecHeading>,
          p: ({ children }) => <ParaText>{children}</ParaText>,
          code: ({ children }) => <CodeBlock>{children}</CodeBlock>,
        }}
        disallowedElements={['h1']}
      >
        {props.content}
      </ReactMarkdown>
      <LinkButton href="/quizzes/1">Start Quiz</LinkButton>
    </NarrowContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const keyword = context.query.topic;
  const { db } = await connectToDatabase();
  const data = await db.collection('topics').find({ file: keyword }).toArray();

  if (data.length === 0) {
    return {
      redirect: {
        destination: '/topics',
        permanent: false,
      },
    };
  }
  const content = await fetchTopicData(keyword);

  console.log(data);

  const foundTopic = data[0];
  return {
    props: { content, foundTopic },
  };
}
