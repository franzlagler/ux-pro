import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

const nodemailer = require('nodemailer');

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
      try {
        const user = session.user;
        const { title, textProposal } = req.body;

        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'christy.ferry53@ethereal.email',
            pass: 'v4jqpxURZ8DcsHrrZr',
          },
        });

        const info = await transporter.sendMail({
          from: `${user?.name}<${user?.email}>`,
          to: 'christy.ferry53@ethereal.email',
          subject: 'New Topic Proposal',
          text: `${title}
        ${textProposal}`,
        });

        res.status(201).json({
          message: `Successfuly sent message with ID: ${info.messageId}`,
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized Action' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized Method' });
  }
}
