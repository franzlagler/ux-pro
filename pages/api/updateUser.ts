import { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '../../util/DB/updateQueries';

export default async function updateUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const { user, updateKey, updateValue } = req.body;

    const result = await updateUser(user._id, updateKey, updateValue);
    console.log(result);

    res.status(201).json({ message: result });
  } else {
    res.status(401).json({ message: 'Method not allowed' });
  }
}
