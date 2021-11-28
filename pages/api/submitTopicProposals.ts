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
            user: process.env.ETHEREAL_EMAIL,
            pass: process.env.ETHEREAL_PASSWORD,
          },
        });

        const info = await transporter.sendMail({
          from: `${foundUser?.name}<${foundUser?.email}>`,
          to: process.env.ETHEREAL_EMAIL,
          subject: 'New Topic Proposal',
          text: `${title}
        ${textProposal}`,
        });

        res.status(201).json({
          ok: true,
          message: `Successfuly sent message with ID: ${info.messageId}`,
        });
      } catch (err) {
        res.status(500).json({ ok: false, message: err });
      }
    } else {
      res.status(401).json({ ok: false, message: 'Unauthorized Action' });
    }
  } else {
    res.status(401).json({ ok: false, message: 'Unauthorized Method' });
  }
}
