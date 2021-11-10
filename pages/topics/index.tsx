import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import {
  ImageContainer,
  SingleTopicContainer,
  SingleTopicContainerLink,
  SingleTopicImageContainer,
  TopicsContainer,
  WideContainer,
} from '../../components/ContainerElements';
import { PrimHeading, SecHeading } from '../../components/TextElements';
import { getAllTopics } from '../../util/dbQueries';

type Topic<Document> = {
  file: string;
};

export default function Topics({ allTopics }: { allTopics: Document[] }) {
  return (
    <WideContainer>
      <PrimHeading>Topics</PrimHeading>
      <TopicsContainer>
        {allTopics.map((topic: Topic) => {
          return (
            <SingleTopicContainer key={topic.file}>
              <Link href={`/topics/${topic.file}`} passHref>
                <SingleTopicContainerLink>
                  <SecHeading>{topic.title}</SecHeading>
                  <SingleTopicImageContainer>
                    <Image src={`/images/${topic.file}-1.svg`} layout="fill" />
                  </SingleTopicImageContainer>
                </SingleTopicContainerLink>
              </Link>
            </SingleTopicContainer>
          );
        })}
      </TopicsContainer>
    </WideContainer>
  );
}

export async function getServerSideProps() {
  const allTopics = await getAllTopics();

  return {
    props: { allTopics },
  };
}
