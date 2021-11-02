import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  position: fixed;
  width: 256px;
  height: 100vh;
  padding: 0 32px;
  grid-area: nav;
  background-color: #76f5c0;
  border-right: 3px solid #212529;
`;

const NavbarItemContainer = styled.ul`
  display: grid;
  grid-gap: 30px;
  padding: 24px 0;
`;

const NavbarLink = styled.a`
  display: block;
  text-decoration: none;
  cursor: pointer;
  &:first-of-type {
    margin: 0 0 20px 0;
  }
`;

const NavbarItemBlock = styled.div`
  display: flex;
  grid-gap: 16px;
  align-items: center;
`;

const NavbarItemText = styled.li`
  list-style-type: none;
  font-size: 20px;
  font-weight: 600;
  color: #212529;
`;

export default function Navbar() {
  return (
    <NavbarContainer>
      <NavbarItemContainer>
        <Link href="/" passHref>
          <NavbarLink>
            <Image src="/images/logo.svg" width="90px" height="70px" />
          </NavbarLink>
        </Link>
        <Link href="/about" passHref>
          <NavbarLink>
            <NavbarItemBlock>
              <Image src="/images/about.svg" width="30px" height="30px" />

              <NavbarItemText>About</NavbarItemText>
            </NavbarItemBlock>
          </NavbarLink>
        </Link>
        <Link href="/topics" passHref>
          <NavbarLink>
            <NavbarItemBlock>
              <Image src="/images/topics.svg" width="30px" height="30px" />
              <NavbarItemText>Topics</NavbarItemText>
            </NavbarItemBlock>
          </NavbarLink>
        </Link>
        <Link href="/score" passHref>
          <NavbarLink>
            <NavbarItemBlock>
              <Image src="/images/score.svg" width="30px" height="30px" />

              <NavbarItemText>Score</NavbarItemText>
            </NavbarItemBlock>
          </NavbarLink>
        </Link>
        <Link href="/submit" passHref>
          <NavbarLink>
            <NavbarItemBlock>
              <Image src="/images/submit.svg" width="30px" height="30px" />

              <NavbarItemText>Submit</NavbarItemText>
            </NavbarItemBlock>
          </NavbarLink>
        </Link>
      </NavbarItemContainer>
    </NavbarContainer>
  );
}
