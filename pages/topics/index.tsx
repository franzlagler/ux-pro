import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import {
  PrimHeadingContainer,
  WideContainer,
} from '../../components/ContainerElements';
import { PrimHeading, SecHeading } from '../../components/TextElements';
import { connectToDatabase } from '../../util/mongodb';

const TopicsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 16px;
`;

const SingleTopicContainer = styled.div`
  width: 420px;
  height: 320px;
  background-color: #fff;
  border: 3px solid #212529;
  border-radius: 3%;
  text-align: center;
  overflow: hidden;
`;

const SingleTopicContainerLink = styled.a`
  text-decoration: none;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 0 3% 3%;
  overflow-y: hidden;
`;

export default function Topics(props: { data: [] }) {
  return (
    <WideContainer>
      <PrimHeading>Topics</PrimHeading>
      <TopicsContainer>
        {props.data.map((el: { id: number; title: string; file: string }) => {
          return (
            <SingleTopicContainer key={el.id}>
              <Link href={`topics/${el.file}`} passHref>
                <SingleTopicContainerLink>
                  <SecHeading>{el.title}</SecHeading>
                  <ImageContainer>
                    <Image src={`/images/${el.file}-1.png`} layout="fill" />
                  </ImageContainer>
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
  const { db } = await connectToDatabase();
  const data = await db.collection('topics').find({}).toArray();

  return {
    props: { data },
  };
}
