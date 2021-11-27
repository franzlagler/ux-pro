import { useRouter } from 'next/router';
import React, { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { logIn } from '../../state/loggedInSlice';
import { validateRegistrationDataClientSide } from '../../util/validation';

interface CredentialsType {
  name: string;
  email: string;
  password: string;
  [key: string]: string;
}
interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

export default function SignUp() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<CredentialsType>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const dispatch = useDispatch();

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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const { ok, message } = await res.json();
      setErrors(message);

      if (ok) {
        dispatch(logIn());
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
