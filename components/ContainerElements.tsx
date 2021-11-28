import styled from 'styled-components';

export const WideContainer = styled.div`
  padding: 0 40px;

  @media (max-width: 500px) {
    padding: 0 20px;
  } ;
`;

export const PrimHeadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const NarrowContainer = styled.div`
  position: relative;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  -webkit-overflow-scrolling: touch;
  max-width: 600px;
  margin: 0 auto;
  padding: 1% 0;

  @media (max-width: 620px) {
    padding: 0 20px;
  } ;
`;

export const CodeBlock = styled.span``;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  margin: 20px 0;
  background-color: #ada7ff;
  border: 5px solid black;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 400px) {
    height: 300px;
  } ;
`;

export const ButtonContainer = styled.div`
  display: flex;
  grid-gap: 10px;
`;

export const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const TopicsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 16px;
`;

export const SingleTopicContainer = styled.div`
  width: 480px;
  height: 300px;
  background-color: #fff;
  border: 5px solid #212529;
  border-radius: 3%;
  text-align: center;
  overflow: hidden;

  @media (max-width: 500px) {
    height: 240px;
  }
`;

export const SingleTopicContainerLink = styled.a`
  text-decoration: none;
`;

export const SingleTopicImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ada7ff;
  border-radius: 0 0 3% 3%;
  overflow-y: hidden;
`;
