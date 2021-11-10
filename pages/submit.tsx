import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { NarrowContainer } from '../components/ContainerElements';
import { PrimHeading } from '../components/TextElements';
import TipTap from '../components/TipTap';

const FieldLabel = styled.label`
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 20px 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 500px;
  border: 3px solid #212529;
  border-radius: 10px;
`;

export default function Submit() {
  return (
    <NarrowContainer>
      <PrimHeading>Submit</PrimHeading>
      <TipTap />
    </NarrowContainer>
  );
}
