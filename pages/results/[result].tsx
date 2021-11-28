import { Document } from 'bson';
import { NextPageContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { RegularButton } from '../../components/Buttons';
import { WideContainer } from '../../components/ContainerElements';
import {
  ParaText,
  PrimHeading,
  SecHeading,
} from '../../components/TextElements';
import { getSessionCookie, removeCookie } from '../../util/cookies';
import {
  findProfile,
  findResult,
  findSession,
  findTopicQuestions,
} from '../../util/DB/findQueries';
import { sortTopicQuestions } from '../../util/quiz';

const SingleResultContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 5px solid #212529;
  border-radius: 15px;
  /* Hello*/
`;

const QuestionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-template-rows: 1fr;
  align-items: center;
  grid-gap: 20px;
`;

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: 35px 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 5px;
  background-color: ${(props: { backgroundColor?: string }) =>
    props.backgroundColor};
  border-radius: 5px;
`;

const CheckboxText = styled.p`
  font-size: 20px;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 30px30px;
  height: 25px;
  border: 5px solid #212529;
  border-radius: 3px;

  &:checked {
    background: url('/images/cross.svg') no-repeat center;
  }
`;

interface TopicQuestions extends Document {
  _id: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

interface ResultsProps {
  result: Document;
  topicQuestions: TopicQuestions[];
}

export default function Results({ result, topicQuestions }: ResultsProps) {
  const router = useRouter();

  const redoQuiz = () => {
    removeCookie('result');
    router.push(`/quizzes/${topicQuestions[0].keyword}`);
  };
  return (
    <WideContainer>
      <PrimHeading data-cy="results-heading">Results</PrimHeading>
      <ParaText>Check out how well you performed in the quiz!</ParaText>
      <SecHeading>Legend</SecHeading>
      <CheckboxContainer>
        <Image src="/images/correctAnswer.svg" width="30px" height="30px" />
        <CheckboxText>The question is answered totally correct.</CheckboxText>
      </CheckboxContainer>
      <CheckboxContainer>
        <Image src="/images/wrongAnswer.svg" width="30px" height="30px" />
        <CheckboxText>
          The question is not answered totally correct.
        </CheckboxText>
      </CheckboxContainer>
      <CheckboxContainer backgroundColor="#76f5c0">
        <Checkbox type="checkbox" disabled checked />
        <CheckboxText>
          The respective individual answer is correct.
        </CheckboxText>
      </CheckboxContainer>
      {topicQuestions.map(
        (
          el: {
            _id: string;
            question: string;
            answer1: string;
            answer2: string;
            answer3: string;
            answer4: string;
          },
          index: number,
        ) => {
          return (
            <SingleResultContainer key={el._id}>
              <QuestionContainer>
                <SecHeading>
                  {index + 1}. {el.question}
                </SecHeading>
                <Image
                  src={`/images/${
                    result.isCorrectlyAnswered[index]
                      ? 'correctAnswer'
                      : 'wrongAnswer'
                  }.svg`}
                  width="30px"
                  height="30px"
                />
              </QuestionContainer>
              <CheckboxContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[0] === true &&
                  result.questionAnswers[index][0] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={
                    result.questionAnswers[index][0] === true ? true : false
                  }
                />
                <CheckboxText>{el.answer1}</CheckboxText>
              </CheckboxContainer>
              <CheckboxContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[1] === true &&
                  result.questionAnswers[index][1] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={
                    result.questionAnswers[index][1] === true ? true : false
                  }
                />
                <CheckboxText>{el.answer2}</CheckboxText>
              </CheckboxContainer>
              <CheckboxContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[2] === true &&
                  result.questionAnswers[index][2] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={
                    result.questionAnswers[index][2] === true ? true : false
                  }
                />
                <CheckboxText>{el.answer3}</CheckboxText>
              </CheckboxContainer>
              <CheckboxContainer
                backgroundColor={
                  topicQuestions[index].correctAnswers[3] === true &&
                  result.questionAnswers[index][3] === true
                    ? '#76f5c0'
                    : ''
                }
              >
                <Checkbox
                  type="checkbox"
                  disabled
                  checked={
                    result.questionAnswers[index][3] === true ? true : false
                  }
                />
                <CheckboxText>{el.answer4}</CheckboxText>
              </CheckboxContainer>
            </SingleResultContainer>
          );
        },
      )}
      <RegularButton onClick={redoQuiz}>Try Again</RegularButton>
    </WideContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const currentSessionToken = getSessionCookie(context.req?.headers.cookie);

  const validSession = await findSession(currentSessionToken);
  if (!validSession) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  if (typeof context.query.result === 'string') {
    const [enteredProfileId, topicNumber] = context.query.result.split('-');

    const foundProfile = await findProfile(validSession.userId);

    if (foundProfile?._id !== enteredProfileId) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const result = await findResult(foundProfile._id, Number(topicNumber));
    if (!result) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    let topicQuestions = await findTopicQuestions(Number(topicNumber));
    topicQuestions = sortTopicQuestions(topicQuestions);

    return {
      props: { result, topicQuestions },
    };
  }
}
