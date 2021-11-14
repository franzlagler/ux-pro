import { NextPageContext } from 'next';
import { getSession } from 'next-auth/client';
import router, { useRouter } from 'next/router';
import React, { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import { RegularButton } from '../../components/Buttons';
import {
  ButtonContainer,
  NarrowContainer,
  PrimHeadingContainer,
} from '../../components/ContainerElements';
import {
  ErrorMessage,
  Field,
  FieldContainer,
  Form,
  Label,
} from '../../components/FormFields';
import { PrimHeading } from '../../components/TextElements';
import { validateRegistrationDataClientSide } from '../../util/validation';

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

export default function SignUp({ user }) {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldId = e.currentTarget.id;
    const fieldValue = e.currentTarget.value;

    setCredentials({ ...credentials, [fieldId]: fieldValue });
  };

  const handleFieldLeave = (e: FocusEvent<HTMLInputElement>) => {
    const fieldId = e.currentTarget.id;
    const validationMessage = validateRegistrationDataClientSide(
      fieldId,
      credentials[fieldId],
    );
    setErrors({ ...errors, [fieldId]: validationMessage });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = credentials;

    if (Object.values(errors).every((el) => el === undefined)) {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          name,
          email,
          password,
        }),
      });

      const { ok, message } = await res.json();
      setErrors(message);

      if (ok) {
        setTimeout(() => router.push('/auth/signin'), 2000);
      }
    }
  };

  return (
    <NarrowContainer>
      <PrimHeadingContainer>
        <PrimHeading>Sign Up</PrimHeading>
      </PrimHeadingContainer>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <FieldContainer>
          <Field
            id="name"
            value={credentials.name}
            onChange={handleInputChange}
            onBlur={handleFieldLeave}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FieldContainer>
        <Label htmlFor="email">Email</Label>
        <FieldContainer>
          <Field
            type="email"
            id="email"
            value={credentials.email}
            onChange={handleInputChange}
            onBlur={handleFieldLeave}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FieldContainer>
        <Label htmlFor="password">Password</Label>
        <FieldContainer>
          <Field
            type="password"
            id="password"
            value={credentials.password}
            onChange={handleInputChange}
            onBlur={handleFieldLeave}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FieldContainer>
        <ButtonContainer>
          <RegularButton center>Sign Up</RegularButton>
        </ButtonContainer>
      </Form>
    </NarrowContainer>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });
  if (session) {
    const user = session.user;
    return {
      props: user,
    };
  }
}
