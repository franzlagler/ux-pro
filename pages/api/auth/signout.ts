import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSessionByToken } from '../../../util/DB/deleteQueries';

export default async function LogInHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const currentSessionToken = req.cookies.sessionTokenRegister;
    console.log(currentSessionToken);

    const deletedToken = await deleteSessionByToken(currentSessionToken);
    if (deletedToken.acknowledged) {
      res
        .status(200)
        .setHeader(
          'set-Cookie',
          serialize('sessionTokenRegister', '', {
            maxAge: -1,
            path: '/',
          }),
        )
        .json({ ok: true, message: 'User has been successfully logged out.' });
    } else {
      res
        .status(404)
        .json({ ok: false, message: 'No user under this session found.' });
    }
  } else {
    res.status(405).json({ ok: false, message: 'Unauthorized action' });
  }
}
