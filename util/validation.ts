// Server-Side Validation

export const validateRegistrationDataServerSide = (
  name: string,
  email: string,
  password: string,
) => {
  if (!name || !name.includes(' ')) {
    return false;
  } else if (!email || !email.includes('@')) {
    return false;
  } else if (
    !/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!"§$%&/()\[\]{}?+*#'\-_])[A-Za-z0-9!"§$%&/()\[\]{}?+*#'\-_]{8,}$/.test(
      password,
    )
  ) {
    return false;
  }

  return true;
};

// Client-Side Validation

const validateName = (givenValue: string) => {
  if (!givenValue) {
    return 'Enter a name.';
  } else if (!givenValue.includes(' ')) {
    return 'Enter a first and last name.';
  }
};

const validateEmail = (givenValue: string) => {
  if (!givenValue) {
    return 'Enter an Email.';
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(givenValue)
  ) {
    return 'Entered Email is invalid.';
  }
};

const validatePassword = (givenValue: string) => {
  if (!givenValue) {
    return 'Enter a password.';
  } else if (
    !/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!"§$%&/()\[\]{}?+*#'\-_])[A-Za-z0-9!"§$%&/()\[\]{}?+*#'\-_]{8,}$/.test(
      givenValue,
    )
  ) {
    return 'Passwords must at least be 8 characters long as well as contain at least one character, one number and one special character.';
  }
};

export const validateRegistrationDataClientSide = (
  fieldId: string,
  fieldValue: string,
) => {
  if (fieldId === 'name') {
    return validateName(fieldValue);
  } else if (fieldId === 'email') {
    return validateEmail(fieldValue);
  } else if (fieldId === 'password') {
    return validatePassword(fieldValue);
  }
};

export const validateTopicProposalClientSide = (
  title: string,
  textProposal: string,
) => {
  if (!/^[a-zA-Z/d.!?()/§$%&+*#]$/.test(title)) {
    return '';
  }
};
