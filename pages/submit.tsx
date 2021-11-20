import { NextPageContext } from 'next';
import { getSession } from 'next-auth/client';
import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { RegularButton } from '../components/Buttons';
import { NarrowContainer } from '../components/ContainerElements';
import { Field, Form, Label } from '../components/FormFields';
import {
  ParaText,
  PrimHeading,
  SuccessMessage,
} from '../components/TextElements';
import { getSessionCookie } from '../util/cookies';
import { findSession, findUserById } from '../util/DB/findQueries';

const TextArea = styled.textarea`
  width: 100%;
  min-height: 500px;
  padding: 5px;
  margin: 0 0 15px 0;
  border: 5px solid #212529;
  border-radius: 15px;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  resize: none;
`;

export default function Submit() {
  const [inputData, setInputData] = useState({ title: '', textProposal: '' });
  const [status, setStatus] = useState('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldId = e.currentTarget.id;
    const fieldValue = e.currentTarget.value;

    setInputData({ ...inputData, [fieldId]: fieldValue });
  };
  const handlePropsalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/submitTopicProposals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: inputData.title,
        textProposal: inputData.textProposal,
      }),
    });
    setInputData({ title: '', textProposal: '' });
    console.log(response);

    setStatus('Email has been successfully sent!');
  };
  return (
    <NarrowContainer>
      <PrimHeading center>Submit</PrimHeading>
      <ParaText>
        Would you like to contribute to the platform with an own topic? Send us
        your idea!
      </ParaText>
      <Form onSubmit={handlePropsalSubmit}>
        <Label htmlFor="title">Topic Title</Label>
        <Field
          id="title"
          value={inputData.title}
          onChange={handleInputChange}
        />
        <Label htmlFor="text">Text Proposal</Label>
        <TextArea
          id="textProposal"
          value={inputData.textProposal}
          onChange={handleInputChange}
          spellCheck="false"
        />
        {status && <SuccessMessage>{status}</SuccessMessage>}
        <RegularButton center>Submit</RegularButton>
      </Form>
    </NarrowContainer>
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

  return {
    props: {},
  };
}
