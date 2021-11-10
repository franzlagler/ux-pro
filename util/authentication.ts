export const validateRegistrationDataServerSide = (
  name: string,
  email: string,
  password: string,
) => {
  if (!name || !name.includes(' ')) {
    return false;
  }

  if (!email || !email.includes('@')) {
    return false;
  }

  if (
    !/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!"§$%&/()\[\]{}?+*#'\-_])[A-Za-z0-9!"§$%&/()\[\]{}?+*#'\-_]{8,}$/.test(
      password,
    )
  ) {
    return false;
  }

  return true;
};

export const validateRegistrationDataClientSide = (
  curEl: string,
  value: string,
) => {
  const status: { name?: string; email?: string; password?: string } = {};
  if (curEl === 'name') {
    if (!value) {
      status.name = 'Enter a name';
    } else if (!value.includes(' ')) {
      status.name = 'Enter a first and last name';
    }
  } else if (curEl === 'email') {
    if (!value) {
      status.email = 'Enter an Email';
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
    ) {
      status.email = 'Entered email is invalid';
    }
  } else if (curEl === 'password') {
    if (!value) {
      status.password = 'Enter a password';
    } else if (
      !/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!"§$%&/()\[\]{}?+*#'\-_])[A-Za-z0-9!"§$%&/()\[\]{}?+*#'\-_]{8,}$/.test(
        value,
      )
    ) {
      status.password =
        'Passwords must be at least 8 characters long and consist of at least one character, digit and special character ';
    }
  }

  return status;
};
