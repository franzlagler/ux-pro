import { useSession } from 'next-auth/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

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

const RegularNavbarItemContainer = styled.ul`
  display: grid;
  grid-gap: 30px;
`;

const RegularNavbarLink = styled.a`
  display: block;
  text-decoration: none;
  cursor: pointer;
`;

const RegularNavbarItemBlock = styled.div`
  display: flex;
  grid-gap: 16px;
  align-items: center;
  width: 90%;
  padding-bottom: 5px;
`;

const RegularNavbarItemText = styled.li`
  list-style-type: none;
  font-size: 20px;
  font-weight: 600;
  color: #212529;
`;

export function RegularNavbar() {
  const [session] = useSession();

  return (
    <RegularNavbarContainer>
      <RegularNavbarItemContainer>
        <RegularLogoContainer>
          <Image src="/images/logo.svg" layout="fill" />
        </RegularLogoContainer>

        <Link href="/" passHref>
          <RegularNavbarLink>
            <RegularNavbarItemBlock>
              <Image src="/images/dashboard.svg" width="30px" height="30px" />
              <RegularNavbarItemText>Dashboard</RegularNavbarItemText>
            </RegularNavbarItemBlock>
          </RegularNavbarLink>
        </Link>
        <Link href="/topics" passHref>
          <RegularNavbarLink>
            <RegularNavbarItemBlock>
              <Image src="/images/topics.svg" width="30px" height="30px" />
              <RegularNavbarItemText>Topics</RegularNavbarItemText>
            </RegularNavbarItemBlock>
          </RegularNavbarLink>
        </Link>

        {session && (
          <>
            <Link href="/submit" passHref>
              <RegularNavbarLink>
                <RegularNavbarItemBlock>
                  <Image src="/images/submit.svg" width="30px" height="30px" />

                  <RegularNavbarItemText>Submit</RegularNavbarItemText>
                </RegularNavbarItemBlock>
              </RegularNavbarLink>
            </Link>
            <Link href="/profile" passHref>
              <RegularNavbarLink>
                <RegularNavbarItemBlock>
                  <Image src="/images/profile.svg" width="30px" height="30px" />
                  <RegularNavbarItemText>User Profile</RegularNavbarItemText>
                </RegularNavbarItemBlock>
              </RegularNavbarLink>
            </Link>
          </>
        )}
      </RegularNavbarItemContainer>
    </RegularNavbarContainer>
  );
}

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

const MobileNavbarMenuItemsContainer = styled.ul`
  display: grid;
  grid-gap: 40px;
  align-content: flex-start;
  position: fixed;
  top: 70px;
  width: 100%;
  height: 100vh;
  padding: 60px 30px;
  z-index: 1;
  background-color: #76f5c0;
  @media (min-width: 900px) {
    display: none;
  }
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

export function MobileNavbar() {
  const router = useRouter();
  const [displayMenuItems, setDisplayMenuItems] = useState(false);

  const handleMenuClick = () => {
    setDisplayMenuItems(!displayMenuItems);
  };

  const handleItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    const itemName = e.currentTarget.id;

    router.push(`/${itemName}`);
    setTimeout(() => setDisplayMenuItems(!displayMenuItems), 500);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900) {
        setDisplayMenuItems(false);
      }
    });
  }, []);
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
        <MobileNavbarMenuItemsContainer>
          <MobileNavbarItemButton id="" onClick={handleItemClick}>
            <Image src="/images/dashboard.svg" width="30px" height="30px" />
            <MobileNavbarItemText>Dashboard</MobileNavbarItemText>
          </MobileNavbarItemButton>
          <MobileNavbarItemButton id="topics" onClick={handleItemClick}>
            <Image src="/images/topics.svg" width="30px" height="30px" />
            <MobileNavbarItemText>Topic</MobileNavbarItemText>
          </MobileNavbarItemButton>
          <MobileNavbarItemButton id="submit" onClick={handleItemClick}>
            <Image src="/images/submit.svg" width="30px" height="30px" />
            <MobileNavbarItemText>Submit</MobileNavbarItemText>
          </MobileNavbarItemButton>
          <MobileNavbarItemButton id="profile" onClick={handleItemClick}>
            <Image src="/images/profile.svg" width="30px" height="30px" />
            <MobileNavbarItemText>Profile</MobileNavbarItemText>
          </MobileNavbarItemButton>
        </MobileNavbarMenuItemsContainer>
      )}
    </>
  );
}
