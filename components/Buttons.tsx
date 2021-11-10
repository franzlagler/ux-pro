import styled from 'styled-components';

export const LinkButton = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  margin: 20px 0;
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

export const RegularButton = styled.button`
  width: 220px;
  height: 50px;
  margin: 20px 0;
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
  &:disabled {
    background-color: #dee2e6;
    opacity: 0.7;
  }
`;

export const AnswerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: ${(props: { backgroundColor: boolean }) =>
    !props.backgroundColor ? '#fff' : '#ffee99'};
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

export const LikeButton = styled.button`
  position: relative;
  width: 100px;
  height: 50px;
  margin: 20px 0;
  background-image: ${(props) =>
    props.liked
      ? "url('/images/heart_liked.svg')"
      : "url('/images/heart_not_liked.svg')"};
  background-repeat: no-repeat;
  background-position-x: center;
  background-color: ${(props: { liked?: Boolean }) =>
    props.liked ? '#76f5c0' : 'inherit'};
  border: 3px solid #212529;
  border-radius: 15px;

  text-decoration: none;
  color: inherit;
  box-shadow: 1px 1px 0 1px #212529;
  cursor: pointer;
  &:active {
    transform: translateX(1px);
    box-shadow: none;
  }
`;

export const SocialMediaButton = styled.a`
  width: 100px;
  height: 50px;
  margin: 20px 0;
  background-image: ${(props: { url: string }) => 'url(' + props.url + ')'};
  background-repeat: no-repeat;
  background-position-x: center;
  background-color: #ffee99;
  border: 3px solid #212529;
  border-radius: 15px;

  text-decoration: none;
  color: inherit;
  box-shadow: 1px 1px 0 1px #212529;
  cursor: pointer;
  &:active {
    transform: translateX(1px);
    box-shadow: none;
  }
`;
