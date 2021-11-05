import Cookies from 'js-cookie';

export function getCookies(key: string) {
  try {
    return JSON.parse(Cookies.get(key)!);
  } catch {
    return undefined;
  }
}

export function setCookies(
  key: string,
  value: { question: number; answers: boolean[] }[],
) {
  Cookies.set(key, JSON.stringify(value));
}

export const setCookieValue = (topic: number, length: number) => {
  const array = [];
  for (let i = 1; i <= length; i++) {
    array.push({
      topic: topic,
      question: i,
      answers: [false, false, false, false],
    });
  }
  console.log(array);

  return array;
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
