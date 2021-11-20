import { Document } from 'bson';
import cookie, { serialize } from 'cookie';
import Cookies from 'js-cookie';

export function getCookies(key: string) {
  try {
    return JSON.parse(Cookies.get(key)!);
  } catch {
    return undefined;
  }
}

export function setCookies(key: string, value: (number | boolean[])[]) {
  Cookies.set(key, JSON.stringify(value));
}

export const setCookieValue = (topic: number, length: number) => {
  const array: [number | boolean[]] = [topic];
  for (let i = 1; i <= length; i++) {
    array.push([false, false, false, false]);
  }
  console.log(array);

  return array;
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};

export const getUserAnswersCookie = (cookieToParse: string | undefined) => {
  if (!cookieToParse) {
    return undefined;
  }
  const foundCookie = cookie.parse(cookieToParse);

  return JSON.parse(foundCookie.userAnswers);
};

export const createSerializedRegisterSessionTokenCookie = (token: string) => {
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 12;

  return serialize('sessionTokenRegister', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    httpOnly: true,
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
  });
};

export const getSessionCookie = (cookieHeaderString: any) => {
  if (!cookieHeaderString) {
    return undefined;
  }
  const foundCookie = cookie.parse(cookieHeaderString);
  return foundCookie.sessionTokenRegister;
};
