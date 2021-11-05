import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import styled from 'styled-components';
import { WideContainer } from '../components/ContainerElements';
import { removeCookie } from '../util/cookies';

export default function Home() {
  useEffect(() => {
    removeCookie('questionAnswers');
  }, []);
  return (
    <WideContainer>
      <h1>Dashboard</h1>
      <h2>Previous Topics</h2>
      <h2>Topic of the Day</h2>
    </WideContainer>
  );
}
