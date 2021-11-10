import React, { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import { RegularButton } from '../../components/Buttons';
import {
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
import { validateRegistrationDataClientSide } from '../../util/authentication';

interface Status {
  name?: string;
  email?: string;
  password?: string;
}

export default function Registration() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState<Status>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const curEl = e.currentTarget.id;
    const curVal = e.currentTarget.value;

    setCredentials((prev) => ({ ...prev, [curEl]: curVal }));
  };

  const handleFieldLeave = (e: FocusEvent<HTMLInputElement>) => {
    const curEl = e.currentTarget.id;
    setStatus(validateRegistrationDataClientSide(curEl, credentials[curEl]));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = credentials;

    if (Object.keys(status).length === 0) {
      const res = await fetch('/api/auth/register', {
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

      const data = await res.json();
      console.log(data);
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
          {status.name && <ErrorMessage>{status.name}</ErrorMessage>}
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
          {status.email && <ErrorMessage>{status.email}</ErrorMessage>}
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
          {status.password && <ErrorMessage>{status.password}</ErrorMessage>}
        </FieldContainer>
        <RegularButton>Sign Up</RegularButton>
      </Form>
    </NarrowContainer>
  );
}
