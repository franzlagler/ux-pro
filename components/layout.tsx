import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './Navbar';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;

};
body {
  height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}


`;

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 256px 1fr;
  grid-template-rows: 100vh;
  grid-template-areas: 'nav content';
`;

const MainContainer = styled.div`
  grid-area: content;
  padding: 48px 0;
`;

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <Navbar />
        <MainContainer>{children}</MainContainer>
      </PageContainer>
    </>
  );
}
