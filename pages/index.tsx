import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import {
  PrimHeadingContainer,
  WideContainer,
} from '../components/ContainerElements';
import { PrimHeading, SecHeading } from '../components/TextElements';

export default function Home() {
  return (
    <WideContainer>
      <PrimHeadingContainer>
        <PrimHeading>Dashboard</PrimHeading>
      </PrimHeadingContainer>

      <SecHeading>Previous Topics</SecHeading>
      <SecHeading>Topic of the Day</SecHeading>
    </WideContainer>
  );
}
