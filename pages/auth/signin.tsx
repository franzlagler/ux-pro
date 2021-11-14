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
import {
  ErrorMessage,
  ParaText,
  PrimHeading,
} from '../../components/TextElements';

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<String | undefined>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldId = e.currentTarget.id;
    const fieldValue = e.currentTarget.value;
    setCredentials({ ...credentials, [fieldId]: fieldValue });
  };
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = credentials;
    const res = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    const signInSuccesful = !res?.error;

    if (signInSuccesful) {
      setErrorMessage('');
      router.push('/profile');
    } else {
      setErrorMessage(res.error);
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
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="password">Password</Label>
          <Field
            type="password"
            id="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </FieldContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
