import express, { type Request, type Response } from 'express';
import nodemailer, { type Transporter } from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

interface ContactFormRequest extends Request {
    body: {
        name: string,
        email: string,
        subject: string,
        message: string
    }
}

const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT as string),
    secure: true, // for 465 true, for 587 false
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

app.post('/contact', async (req: ContactFormRequest, res: Response) => {
    const {name, email, subject, message} = req.body;

    console.log('Drafting mail')

    const mailOptions = {
        from: `${name} <${email}>`,
        replyTo: email,
        to: process.env.SMTP_USER,
        subject: subject,
        html: `
                <p><strong>Name: </strong>${name}</p>
                <p><strong>Email: </strong>${email}</p>
                <p><strong>Subject: </strong>${subject}</p>
                <p><string>Message: </strong><br />${message}</p>
            `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        console.log("Attempting to send...")
        if(error) {
            console.error(error);
            res.status(500).json({message: 'Error submitting form.'});
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: "Form submitted successfully"})
        }
    })
});



app.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT}`);
});