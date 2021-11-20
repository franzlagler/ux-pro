import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
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

export default function SignIn({
  setLoggedIn,
}: {
  setLoggedIn: (value: boolean) => void;
}) {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({ email: '', password: '' });

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
      setLoggedIn(true);
      router.push('/');
    } else {
      const message = await res.json();
      console.log(message);

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
          />
          {errorMessage.password && (
            <ErrorMessage>{errorMessage.password}</ErrorMessage>
          )}
        </FieldContainer>
        <RegularButton>Sign In</RegularButton>
      </Form>
    </NarrowContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });

  if (session) {
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
