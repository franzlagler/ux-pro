import styled from 'styled-components';

export const LinkButton = styled.a<{
  purple?: boolean;
  center?: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 50px;
  margin: ${(props) => (props.center ? '20px auto' : '20px 0')};
  background-color: ${(props) => (props.purple ? '#ada7ff' : '#76f5c0')};
  border: 5px solid #212529;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  color: #212529;
  box-shadow: 1px 1px 0 1px #212529;
  cursor: pointer;
  &:active {
    transform: translateX(1px);
    box-shadow: none;
  }

  @media (max-width: 500px) {
    width: 200px;
    height: 50px;
    font-size: 20px;
  }
`;

export const RegularButton = styled.button<{
  purple?: boolean;
  center?: boolean;
}>`
  margin: ${(props) => (props.center ? '20px auto' : '20px 0')};
  background-color: ${(props) => (props.purple ? '#ada7ff' : '#76f5c0')};
  width: 220px;
  height: 50px;
  border: 5px solid #212529;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  color: #212529;
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

  @media (max-width: 500px) {
    width: 200px;
    height: 50px;
    font-size: 20px;
  }
`;

export const AuthenticationButton = styled.button`
  width: fit-content;
  background-color: inherit;
  border: none;
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  cursor: pointer;
`;

export const AuthenticationLink = styled.a`
  width: fit-content;
  background-color: inherit;
  border: none;
  color: #212529;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
`;

export const AnswerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: ${(props: { backgroundColor: boolean }) =>
    !props.backgroundColor ? '#fff' : '#ffee99'};
  border: 5px solid #212529;
  border-radius: 15px;
  box-shadow: 1px 1px 0 1px #212529;
  color: #212529;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  &:active {
    transform: translateX(1px);
    box-shadow: none;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 140px;
  }
`;

export const LikeButton = styled.button`
  position: relative;
  width: 100px;
  height: 60px;
  margin: 20px 0;
  background-image: ${(props: { liked?: boolean }) =>
    props.liked
      ? "url('/images/heart_liked.svg')"
      : "url('/images/heart_not_liked.svg')"};
  background-repeat: no-repeat;
  background-position-x: center;
  background-color: ${(props: { liked?: Boolean }) =>
    props.liked ? '#76f5c0' : 'inherit'};
  border: 5px solid #212529;
  border-radius: 15px;

  text-decoration: none;
  color: inherit;
  box-shadow: 1px 1px 0 1px #212529;
  cursor: pointer;
  &:active {
    transform: translateX(1px);
    box-shadow: none;
  }

  @media (max-width: 500px) {
    width: 80px;
    height: 50px;
    margin: 10px 0;
  }
`;

export const SocialMediaButton = styled.a`
  width: 100px;
  height: 60px;
  margin: 20px 0;
  background-image: ${(props: { url: string }) => 'url(' + props.url + ')'};
  background-repeat: no-repeat;
  background-position-x: center;
  background-color: #ffee99;
  border: 5px solid #212529;
  border-radius: 15px;

  text-decoration: none;
  color: inherit;
  box-shadow: 1px 1px 0 1px #212529;
  cursor: pointer;
  &:active {
    transform: translateX(1px);
    box-shadow: none;
  }

  @media (max-width: 500px) {
    width: 80px;
    height: 50px;
    margin: 10px 0;
  }
`;

export const DropdownButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  height: 60px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: #ada7ff;
  background-image: ${(props: { open: boolean; firstOfType: boolean }) =>
    props.open
      ? "url('/images/up-arrow.svg')"
      : "url('/images/down-arrow.svg')"};
  background-repeat: no-repeat;
  background-position: 95% 50%;
  background-size: 20px;
  border: 0;
  border-top: ${(props: { firstOfType: boolean; open: boolean }) =>
    props.firstOfType ? '0' : '5px solid #212529'};
  border-radius: 2px;
  color: #212529;
  font-size: 24px;
  font-weight: 800;
  cursor: pointer;
  z-index: 1;

  @media (max-width: 400px) {
    padding: 0 12px;
    font-size: 20px;
  } ;
`;

export const LinkLink = styled.a`
  font-size: 24px;
  font-weight: 800;
  color: #212529;
`;
