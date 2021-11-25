import Image from 'next/image';
import Link from 'next/link';
import {
  SingleTopicContainer,
  SingleTopicContainerLink,
  SingleTopicImageContainer,
  TopicsContainer,
  WideContainer,
} from '../../components/ContainerElements';
import { PrimHeading, SecHeading } from '../../components/TextElements';
import { findAllTopics } from '../../util/DB/findQueries';

export default function Topics({
  allTopics,
}: {
  allTopics: { file: string; title: string }[];
}) {
  return (
    <WideContainer>
      <PrimHeading>Topics</PrimHeading>
      <TopicsContainer>
        {allTopics.map((topic, index) => {
          return (
            <SingleTopicContainer key={topic.file}>
              <Link href={`/topics/${topic.file}`} passHref>
                <SingleTopicContainerLink data-cy={`topic-${index}`}>
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
  const allTopics = await findAllTopics();

  return {
    props: { allTopics },
  };
}
