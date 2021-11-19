import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultSession, Session, User } from 'next-auth';
import { getSession } from 'next-auth/client';

interface ExtendedSessionType extends Session {
  user?: {
    _id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export default async function submitTopicProposalsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const session: ExtendedSessionType | null = await getSession({ req });

    if (session) {
      const user = session.user;
      const userId = user?._id;
      const { title, textProposal } = req.body;

      const msg = {
        to: 'fglagler@gmail.com',
        from: String(user?.email),
        subject: `New Topic Proposal by ${userId}`,
        text: `${title}
        ${textProposal}`,
        html: '',
      };
      const sgAPIKey = process.env.SENDGRID_API_KEY;
      sgMail.setApiKey(sgAPIKey);
      sgMail
        .send(msg)
        .then(() => {
          res.status(201).send({ message: 'Email successfully sent' });
        })
        .catch((err) => {
          console.log(err);

          res.status(500).send({ message: err });
        });
    } else {
      res.status(401).json({ message: 'Unauthorized Action' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized Method' });
  }
}
