import express, { type Request, type Response } from 'express';
import nodemailer, { type Transporter } from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

interface ContactFormRequest extends Request {
  body: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string, 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json("Welcome to Tamil Selvan's Portfolio");
});

app.post('/contact', (req: ContactFormRequest, res: Response) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: `${name} <${email}>`,
    replyTo: email,
    to: process.env.SMTP_USER,
    subject,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br />${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error submitting form.' });
      return;
    }

    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Form submitted successfully' });
  });
});

export default app;
