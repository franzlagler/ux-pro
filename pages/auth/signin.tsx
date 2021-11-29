import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RegularButton } from '../../components/Buttons';
import {
  NarrowContainer,
  PrimHeadingContainer,
} from '../../components/ContainerElements';
import {
  Field,
  FieldContainer,
  Form,
  Label,
} from '../../components/FormFields';
import { ErrorMessage, PrimHeading } from '../../components/TextElements';
import { logIn } from '../../state/loggedInSlice';
import { getSessionCookie } from '../../util/cookies';
import { findSession } from '../../util/DB/findQueries';

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({ email: '', password: '' });

  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldId = e.currentTarget.id;
    const fieldValue = e.currentTarget.value;
    setCredentials({ ...credentials, [fieldId]: fieldValue });
  };
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = credentials;
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      dispatch(logIn());
      router.push('/');
    } else {
      const message = await res.json();

      if (message.email) {
        setErrorMessage({ password: '', email: message.email });
        return;
      }
      setErrorMessage({ email: '', password: message.password });
    }
  };

  return (
    <NarrowContainer>
      <PrimHeadingContainer>
        <PrimHeading>Login</PrimHeading>
      </PrimHeadingContainer>
      <Form onSubmit={handleSignIn}>
        <FieldContainer>
          <Label htmlFor="email">Email</Label>
          <Field
            id="email"
            value={credentials.email}
            onChange={handleInputChange}
            data-cy="email-field"
          />
          {errorMessage.email && (
            <ErrorMessage>{errorMessage.email}</ErrorMessage>
          )}
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="password">Password</Label>
          <Field
            type="password"
            id="password"
            value={credentials.password}
            onChange={handleInputChange}
            data-cy="password-field"
          />
          {errorMessage.password && (
            <ErrorMessage>{errorMessage.password}</ErrorMessage>
          )}
        </FieldContainer>
        <RegularButton data-cy="signIn-button">Sign In</RegularButton>
      </Form>
    </NarrowContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const currentSessionToken = getSessionCookie(context.req?.headers.cookie);

  const validSession = await findSession(currentSessionToken);

  if (validSession) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
