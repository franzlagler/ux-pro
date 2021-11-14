import { NextPageContext } from 'next';
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import styled from 'styled-components';
import { RegularButton } from '../components/Buttons';
import {
  ButtonContainer,
  NarrowContainer,
  PrimHeadingContainer,
} from '../components/ContainerElements';
import { Field, FieldContainer, Label } from '../components/FormFields';
import { ParaText, PrimHeading, SecHeading } from '../components/TextElements';

export default function Profile({ session }) {
  const user = session.user;
  const [profileData, setProfileData] = useState({
    name: session.user.name,
    email: session.user.email,
    passwordHashed: '*****',
  });

  const [disabledFields, setDisabledFields] = useState([true, true, true]);

  const handleInputChange = ({ currentTarget }) => {
    const id = currentTarget.id;
    const value = currentTarget.value;
    console.log(id);

    setProfileData({ ...profileData, [id]: value });
  };

  const handleProfileDataChange = async ({ currentTarget }) => {
    const updateKey = currentTarget.id;

    const updateValue = profileData[updateKey];

    await fetch('/api/updateUser', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, updateKey, updateValue }),
    });

    setProfileData({ ...profileData, [updateKey]: updateValue });
    setDisabledFields(disabledFields.map(() => true));
  };

  return (
    <NarrowContainer>
      <PrimHeadingContainer>
        <PrimHeading>Profile Settings</PrimHeading>
      </PrimHeadingContainer>
      <ParaText>Review your account details below.</ParaText>
      <FieldContainer>
        <Label htmlFor="name">Name</Label>
        <Field
          id="name"
          disabled={disabledFields[0]}
          value={profileData.name}
          onChange={handleInputChange}
        />
        {disabledFields[0] && (
          <RegularButton
            onClick={() => {
              setDisabledFields(
                disabledFields.map((el, index) => (index === 0 ? false : true)),
              );
            }}
          >
            Change Name
          </RegularButton>
        )}
        {!disabledFields[0] && (
          <ButtonContainer>
            <RegularButton id="name" onClick={handleProfileDataChange}>
              Update
            </RegularButton>
            <RegularButton
              purple
              onClick={() =>
                setDisabledFields(
                  disabledFields.map((el, index) =>
                    index === 0 ? true : true,
                  ),
                )
              }
            >
              Cancel
            </RegularButton>
          </ButtonContainer>
        )}
      </FieldContainer>
      <FieldContainer>
        <Label htmlFor="email">Email</Label>
        <Field
          id="email"
          disabled={disabledFields[1]}
          value={profileData.email}
          onChange={handleInputChange}
        />
        {disabledFields[1] && (
          <RegularButton
            onClick={() =>
              setDisabledFields(
                disabledFields.map((el, index) => (index === 1 ? false : true)),
              )
            }
          >
            Change Email
          </RegularButton>
        )}
        {!disabledFields[1] && (
          <ButtonContainer>
            <RegularButton id="email" onClick={handleProfileDataChange}>
              Update
            </RegularButton>
            <RegularButton
              purple
              onClick={() =>
                setDisabledFields(
                  disabledFields.map((el, index) =>
                    index === 1 ? true : true,
                  ),
                )
              }
            >
              Cancel
            </RegularButton>
          </ButtonContainer>
        )}
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="passwordHashed">Password</Label>
        <Field
          id="passwordHashed"
          disabled={disabledFields[2]}
          value={profileData.passwordHashed}
          onChange={handleInputChange}
        />
        {disabledFields[2] && (
          <RegularButton
            onClick={() =>
              setDisabledFields(
                disabledFields.map((el, index) => (index === 2 ? false : true)),
              )
            }
          >
            Change Password
          </RegularButton>
        )}
        {!disabledFields[2] && (
          <ButtonContainer>
            <RegularButton
              id="passwordHashed"
              onClick={handleProfileDataChange}
            >
              Update
            </RegularButton>
            <RegularButton
              purple
              onClick={() =>
                setDisabledFields(
                  disabledFields.map((el, index) =>
                    index === 2 ? true : true,
                  ),
                )
              }
            >
              Cancel
            </RegularButton>
          </ButtonContainer>
        )}
      </FieldContainer>
    </NarrowContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
