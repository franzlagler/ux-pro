import { NextPageContext } from 'next';
import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { RegularButton } from '../components/Buttons';
import {
  ButtonContainer,
  NarrowContainer,
  PrimHeadingContainer,
} from '../components/ContainerElements';
import {
  Field,
  FieldContainer,
  Label,
  ToggleRadioButton,
} from '../components/FormFields';
import { ParaText, PrimHeading } from '../components/TextElements';
import { getSessionCookie } from '../util/cookies';
import { findProfile, findSession, findUserById } from '../util/DB/findQueries';

interface ProfileProps {
  foundUser: {
    name: string;
    email: string;
  };
  showInstructions: boolean;
}

interface ProfileData {
  name: string;
  email: string;
  passwordHashed: string;
  showInstructions: boolean;
  [key: string]: string | undefined | boolean;
}

export default function Profile({ foundUser, showInstructions }: ProfileProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: foundUser.name,
    email: foundUser.email,
    passwordHashed: '*****',
    showInstructions,
  });

  const [disabledFields, setDisabledFields] = useState([true, true, true]);
  const [toggler, setToggler] = useState(showInstructions);

  const handleInputChange = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>) => {
    const id = currentTarget.id;
    const value = currentTarget.value;

    setProfileData({ ...profileData, [id]: value });
  };

  const handleProfileDataChange = async ({
    currentTarget,
  }: MouseEvent<HTMLButtonElement>) => {
    const updateKey = currentTarget.id;

    const updateValue = profileData[updateKey];

    await fetch('/api/updateUser', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updateKey, updateValue }),
    });

    setProfileData({ ...profileData, [updateKey]: updateValue });
    setDisabledFields(disabledFields.map(() => true));
  };

  const handleUpdateShowInstructions = async ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>) => {
    setToggler(!toggler);
    await fetch('/api/updateShowInstructions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newValue: currentTarget.checked }),
    });
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
      <FieldContainer>
        <Label htmlFor="showInstructions">Show Instructions</Label>
        <ToggleRadioButton
          id="showInstructions"
          type="checkbox"
          onChange={handleUpdateShowInstructions}
          checked={toggler}
        />
      </FieldContainer>
    </NarrowContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const sessionToken = getSessionCookie(context.req?.headers.cookie);

  if (sessionToken) {
    const validSession = await findSession(sessionToken);

    if (!validSession) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }
    const foundUser = await findUserById(validSession.userId);
    delete foundUser?._id;
    const foundProfile = await findProfile(validSession.userId);

    return {
      props: { foundUser, showInstructions: foundProfile?.showInstructions },
    };
  }
}
