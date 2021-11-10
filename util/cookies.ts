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

export const updateAnswers = (
  selectedAnswers: boolean[],
  allAnswers: (number | boolean[])[],
  currentQuestionNumber: number,
) => {
  allAnswers = allAnswers.map((el: number | boolean[], index: number) => {
    if (index === currentQuestionNumber) {
      return selectedAnswers;
    }

    return el;
  });

  return allAnswers;
};
