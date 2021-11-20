import { NextApiRequest, NextApiResponse } from 'next';
import { findSession, findUserById } from '../../util/DB/findQueries';

const nodemailer = require('nodemailer');

export default async function submitTopicProposalsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const currentSessionToken = req.cookies.sessionTokenRegister;

    const validSession = await findSession(currentSessionToken);

    if (validSession) {
      try {
        const foundUser = await findUserById(validSession.userId);
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
          from: `${foundUser?.name}<${foundUser?.email}>`,
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
