import { useSession } from 'next-auth/client';
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
  @media (max-width: 900px) {
    display: flex;
    width: 100%;
    height: 70px;
    border-right: 0;
    border-bottom: 3px solid #212529;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 60px;
  height: 40px;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    margin: 0;
  }
`;

const NavbarItemContainer = styled.ul`
  display: grid;
  grid-gap: 30px;
  padding: 24px 0;
  @media (max-width: 900px) {
    display: flex;
    padding: 0;
    align-items: center;
  }
`;

const NavbarLink = styled.a`
  display: block;
  text-decoration: none;
  cursor: pointer;
`;

const NavbarItemBlock = styled.div`
  display: flex;
  grid-gap: 16px;
  align-items: center;
  width: 90%;
  padding-bottom: 5px;
`;

const NavbarItemText = styled.li`
  list-style-type: none;
  font-size: 20px;
  font-weight: 600;
  color: #212529;
`;

export default function Navbar() {
  const [session] = useSession();

  return (
    <NavbarContainer>
      <NavbarItemContainer>
        <LogoContainer>
          <Image src="/images/logo.svg" layout="fill" />
        </LogoContainer>

        <Link href="/" passHref>
          <NavbarLink>
            <NavbarItemBlock>
              <Image src="/images/dashboard.svg" width="30px" height="30px" />
              <NavbarItemText>Dashboard</NavbarItemText>
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
        <Link href="/submit" passHref>
          <NavbarLink>
            <NavbarItemBlock>
              <Image src="/images/submit.svg" width="30px" height="30px" />

              <NavbarItemText>Submit</NavbarItemText>
            </NavbarItemBlock>
          </NavbarLink>
        </Link>
        {session && (
          <Link href="/profile" passHref>
            <NavbarLink>
              <NavbarItemBlock>
                <Image src="/images/profile.svg" width="30px" height="30px" />
                <NavbarItemText>User Profile</NavbarItemText>
              </NavbarItemBlock>
            </NavbarLink>
          </Link>
        )}
      </NavbarItemContainer>
    </NavbarContainer>
  );
}
