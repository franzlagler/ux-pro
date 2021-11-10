import { NextPageContext } from 'next';
import { getProviders, getSession, signIn } from 'next-auth/client';
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
import { PrimHeading } from '../../components/TextElements';

export default function SignIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const curEl = e.currentTarget.id;
    const value = e.currentTarget.value;
    setCredentials((prev: { email: string; password: string }) => ({
      ...prev,
      [curEl]: value,
    }));
  };
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = credentials;
    console.log(email, password);

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    if (!result?.error) {
      router.push('/profile');
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
