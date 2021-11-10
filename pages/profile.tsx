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

export default function Profile(props: {
  session: { user: { name: string; email: string } };
}) {
  const { session } = props;
  const [profileData, setProfileData] = useState({
    name: session.user.name,
    email: session.user.email,
    password: '*****',
  });

  const [disabledFields, setDisabledFields] = useState([true, true, true]);

  const handleProfileDataChange = () => {};

  return (
    <NarrowContainer>
      <PrimHeadingContainer>
        <PrimHeading>Profile Settings</PrimHeading>
      </PrimHeadingContainer>
      <ParaText>Review your account details below.</ParaText>
      <FieldContainer>
        <Label>Name</Label>
        <Field disabled={disabledFields[0]} value={profileData.name} />
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
            <RegularButton>Update</RegularButton>
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
        <Label>Email</Label>
        <Field disabled={disabledFields[1]} value={profileData.email} />
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
            <RegularButton>Update</RegularButton>
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
        <Label>Password</Label>
        <Field disabled={disabledFields[2]} value={profileData.password} />
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
            <RegularButton>Update</RegularButton>
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
