import fs from 'node:fs';
import { Document } from 'bson';

export const fetchTopicData = (file: string) => {
  if (/^[a-z-]*$/.test(file)) {
    const data = fs.readFileSync(`public/texts/${file}.md`, 'utf-8');
    return data;
  }
};

export const checkIfTopicLiked = (likedTopics: [], topicNumber: number) => {
  let isLiked = false;

  for (let i = 0; i < likedTopics.length; i++) {
    if (likedTopics[i] === topicNumber) {
      isLiked = true;
    }
  }

  return isLiked;
};

export const updateLikedTopicsArray = (topicNumber: number, arr: number[]) => {
  if (arr.includes(topicNumber)) {
    return arr.filter((el) => el !== topicNumber);
  }
  return [...arr, topicNumber];
};

interface AllTopics extends Document {
  topicNumber?: number;
}

export const filterFavoriteTopics = (
  allTopics: AllTopics[],
  favoriteTopics: number[],
) => {
  const filteredArray = [];
  for (let i = 0; i < favoriteTopics.length; i++) {
    for (let j = 0; j < allTopics.length; j++) {
      if (favoriteTopics[i] === allTopics[j].topicNumber) {
        filteredArray.push(allTopics[j]);
      }
    }
  }
  return filteredArray;
};
