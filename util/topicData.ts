import fs from 'node:fs';

export default function fetchTopicData(file: any) {
  if (/^[a-z\-]*$/.test(file)) {
    const data = fs.readFileSync(`public/texts/${file}.md`, 'utf-8');
    return data;
  }
  console.log('Invalid input');
}
