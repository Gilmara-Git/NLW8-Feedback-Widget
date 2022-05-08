import { prisma } from './prisma';
import express from 'express';
import nodemailer from 'nodemailer';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ca86c1698d23d1",
      pass: "79fb892ce8137c"
    }
  });

routes.post('/feedbacks', async (req, res)=> {
const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
      data: {
          type,
          comment,
          screenshot,
        }   
  })

  await transport.sendMail({
      from: 'Feedback widget team',
      to: 'Gilmara Pimentel <gilmarapq@hotmailcom>',
      subject: 'New Feedback',
      html: [          
          `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<p>Feedback type: ${type}</p>`,
          `<p>Comment: ${comment}</p>`,
          `</div>`
        ].join('\n')

  })
  return res.status(201).json({ data: feedback })
})