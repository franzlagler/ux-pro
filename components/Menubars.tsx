import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { checkSession, logOut } from '../state/loggedInSlice';
import { RootState } from '../state/store';
import { AuthenticationButton, AuthenticationLink } from './Buttons';

// General Styled Components

const NavbarAllItemsList = styled.ul`
  height: 100%;
  display: grid;
  align-content: space-between;
`;

const NavbarFirstItemBlock = styled.div`
  display: grid;
  grid-gap: 30px;
`;

const NavbarSecondItemBlock = styled.div`
  display: grid;
  grid-gap: 20px;
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

// Regular Navbar Styled Components

const RegularNavbarContainer = styled.nav`
  position: fixed;
  height: 100vh;
  width: 256px;
  padding: 30px;
  grid-area: nav;
  background-color: #76f5c0;
  border-right: 5px solid #212529;
  @media (max-width: 900px) {
    display: none;
  }
`;

const RegularLogoContainer = styled.div`
  position: relative;
  width: 160px;
  height: 60px;
`;

// Mobile Navbar Styled Components

const MobileNavbarContainer = styled.nav`
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 0 30px;
  background-color: #76f5c0;
  border-bottom: 5px solid #212529;
  @media (min-width: 899px) {
    display: none;
  }
`;

const MobileNavbarLogoContainer = styled.div`
  position: relative;
  width: 120px;
  height: 80px;
  cursor: pointer;
`;

const MobileNavbarMenuButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: inherit;
  background-image: ${(props: { displayMenuItems: boolean }) =>
    !props.displayMenuItems
      ? "url('/images/menu-open.svg')"
      : "url('/images/menu-closed.svg')"};
  background-repeat: no-repeat;
  background-position: 50%;
  border: none;
  cursor: pointer;
`;

const MobileBarDropDownMenu = styled.div`
  position: fixed;
  top: 70px;
  width: 100%;
  height: 100vh;
  padding: 30px 30px;
  z-index: 1;
  background-color: #76f5c0;
  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileNavbarAllItemsList = styled.ul`
  height: 90%;
  display: grid;
  align-content: space-between;
`;

const MobileNavbarItemButton = styled.button`
  width: 200px;
  display: flex;
  align-items: center;
  grid-gap: 16px;
  background-color: inherit;
  border: none;
  cursor: pointer;
`;

const MobileNavbarItemText = styled.li`
  list-style-type: none;
  font-size: 30px;
  font-weight: 600;
  color: #212529;
`;

// Navbar Components

export function RegularNavbar() {
  const router = useRouter();

  const loggedIn = useSelector((state: RootState) => state.loggedIn.isLoggedIn);
  const dispatch = useDispatch();

  const handleSignOutClick = async () => {
    const response = await fetch('/api/auth/signout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const status = await response.json();
    if (status.ok) {
      dispatch(logOut);
      router.push('/');
      router.reload();
    }
  };

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);
  return (
    <RegularNavbarContainer>
      <NavbarAllItemsList>
        <NavbarFirstItemBlock>
          <RegularLogoContainer>
            <Image src="/images/logo.svg" layout="fill" />
          </RegularLogoContainer>

          <Link href="/" passHref>
            <NavbarLink>
              <NavbarItemBlock>
                <Image src="/images/dashboard.svg" width="30px" height="30px" />
                <NavbarItemText data-cy="dashboard-item">
                  Dashboard
                </NavbarItemText>
              </NavbarItemBlock>
            </NavbarLink>
          </Link>
          <Link href="/topics" passHref>
            <NavbarLink>
              <NavbarItemBlock>
                <Image src="/images/topics.svg" width="30px" height="30px" />
                <NavbarItemText data-cy="topic-item">Topics</NavbarItemText>
              </NavbarItemBlock>
            </NavbarLink>
          </Link>

          {loggedIn && (
            <>
              <Link href="/submit" passHref>
                <NavbarLink>
                  <NavbarItemBlock>
                    <Image
                      src="/images/submit.svg"
                      width="30px"
                      height="30px"
                    />

                    <NavbarItemText>Submit</NavbarItemText>
                  </NavbarItemBlock>
                </NavbarLink>
              </Link>
              <Link href="/profile" passHref>
                <NavbarLink>
                  <NavbarItemBlock>
                    <Image
                      src="/images/profile.svg"
                      width="30px"
                      height="30px"
                    />
                    <NavbarItemText>User Profile</NavbarItemText>
                  </NavbarItemBlock>
                </NavbarLink>
              </Link>
            </>
          )}
        </NavbarFirstItemBlock>
        <NavbarSecondItemBlock>
          {!loggedIn && (
            <Link href="/auth/signin" passHref>
              <AuthenticationLink>Log In</AuthenticationLink>
            </Link>
          )}
          {loggedIn && (
            <AuthenticationButton onClick={handleSignOutClick}>
              Log Out
            </AuthenticationButton>
          )}
          <Link href="/auth/signup" passHref>
            <AuthenticationLink>Register</AuthenticationLink>
          </Link>
        </NavbarSecondItemBlock>
      </NavbarAllItemsList>
    </RegularNavbarContainer>
  );
}

export function MobileNavbar() {
  const router = useRouter();
  const loggedIn = useSelector((state: RootState) => state.loggedIn.isLoggedIn);
  const dispatch = useDispatch();
  const [displayMenuItems, setDisplayMenuItems] = useState(false);

  const handleMenuClick = () => {
    setDisplayMenuItems(!displayMenuItems);
  };

  const handleItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    const itemName = e.currentTarget.id;

    router.push(`/${itemName}`);
    setTimeout(() => setDisplayMenuItems(!displayMenuItems), 700);
  };

  const handleSignInClick = () => {
    router.push('/auth/signin');
    setDisplayMenuItems(!displayMenuItems);
  };

  const handleSignOutClick = async () => {
    const response = await fetch('/api/auth/signout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const status = await response.json();
    if (status.ok) {
      dispatch(logOut());
      router.reload();
    }
  };

  const handleSignUpClick = () => {
    router.push('/auth/signup');
    setDisplayMenuItems(!displayMenuItems);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900) {
        setDisplayMenuItems(false);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);
  return (
    <>
      <MobileNavbarContainer>
        <Link href="/" passHref>
          <MobileNavbarLogoContainer>
            <Image src="/images/logo.svg" layout="fill" />
          </MobileNavbarLogoContainer>
        </Link>
        <MobileNavbarMenuButton
          displayMenuItems={displayMenuItems}
          onClick={handleMenuClick}
        />
      </MobileNavbarContainer>
      {displayMenuItems && (
        <MobileBarDropDownMenu>
          <MobileNavbarAllItemsList>
            <NavbarFirstItemBlock>
              <MobileNavbarItemButton id="" onClick={handleItemClick}>
                <Image src="/images/dashboard.svg" width="30px" height="30px" />
                <MobileNavbarItemText>Dashboard</MobileNavbarItemText>
              </MobileNavbarItemButton>
              <MobileNavbarItemButton id="topics" onClick={handleItemClick}>
                <Image src="/images/topics.svg" width="30px" height="30px" />
                <MobileNavbarItemText>Topics</MobileNavbarItemText>
              </MobileNavbarItemButton>
              {loggedIn && (
                <>
                  <MobileNavbarItemButton id="submit" onClick={handleItemClick}>
                    <Image
                      src="/images/submit.svg"
                      width="30px"
                      height="30px"
                    />
                    <MobileNavbarItemText>Submit</MobileNavbarItemText>
                  </MobileNavbarItemButton>
                  <MobileNavbarItemButton
                    id="profile"
                    onClick={handleItemClick}
                  >
                    <Image
                      src="/images/profile.svg"
                      width="30px"
                      height="30px"
                    />
                    <MobileNavbarItemText>Profile</MobileNavbarItemText>
                  </MobileNavbarItemButton>
                </>
              )}
            </NavbarFirstItemBlock>
            <NavbarSecondItemBlock>
              {!loggedIn && (
                <AuthenticationButton onClick={handleSignInClick}>
                  Log In
                </AuthenticationButton>
              )}
              {loggedIn && (
                <AuthenticationButton onClick={handleSignOutClick}>
                  Log Out
                </AuthenticationButton>
              )}
              <Link href="/auth/signup" passHref>
                <AuthenticationButton onClick={handleSignUpClick}>
                  Register
                </AuthenticationButton>
              </Link>
            </NavbarSecondItemBlock>
          </MobileNavbarAllItemsList>
        </MobileBarDropDownMenu>
      )}
    </>
  );
}
