import styled from 'styled-components';

export const LinkButton = styled.a`
  display: flex;
  width: fit-content;
  padding: 10px 40px;
  margin: 30px auto;
  background-color: ${(props: { purple?: Boolean }) =>
    props.purple ? '#ada7ff' : '#76f5c0'};
  border: 3px solid #212529;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
  box-shadow: 1px 1px 0 1px #212529;
  cursor: pointer;
  &:active {
    transform: translateX(1px);
    box-shadow: none;
  }
`;

export const AnswerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 70px;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor};
  border: 3px solid #212529;
  border-radius: 15px;
  box-shadow: 1px 1px 0 1px #212529;

  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  &:active {
    transform: translateX(1px);
    box-shadow: none;
  }
`;
