import styled from 'styled-components';
import { RegularButton } from '../components/Buttons';
import { NarrowContainer } from '../components/ContainerElements';
import { Field, FieldContainer, Form, Label } from '../components/FormFields';
import { PrimHeading } from '../components/TextElements';

const TextArea = styled.textarea`
  width: 100%;
  min-height: 500px;
  padding: 5px;
  margin-top: 5px;
  border: 3px solid #212529;
  border-radius: 15px;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
`;

export default function Submit() {
  return (
    <NarrowContainer>
      <PrimHeading>Submit</PrimHeading>
      <Form>
        <Label>Title</Label>
        <Field />
        <Label htmlFor="text"> Text Proposal</Label>
        <TextArea id="text" />
        <Label htmlFor="text"> Files</Label>
        <Field type="file" />
        <RegularButton>Submit</RegularButton>
      </Form>
    </NarrowContainer>
  );
}
