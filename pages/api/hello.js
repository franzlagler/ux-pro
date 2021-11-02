import { updateDatabase } from '../../util/dbManipulation';

export default async function handler(req, res) {
  await updateDatabase();
}
