Portfolio SMTP Server

A lightweight SMTP-backed contact form API for a portfolio website. This service is built with Node.js, Express, TypeScript, and Nodemailer and provides an API for receiving portfolio contact form submissions and forwarding them directly to a configured email inbox.

Features

- REST API for portfolio contact forms
- SMTP-based email delivery
- Built with TypeScript
- Express.js API server
- Nodemailer integration
- CORS support
- JSON and URL-encoded request support
- Environment-based configuration
- Docker support
- Vercel serverless deployment support
- Compatible with SMTP providers such as Gmail and other SMTP services

Tech Stack

- Node.js
- TypeScript
- Express.js
- Nodemailer
- CORS
- dotenv
- Docker
- Vercel

How It Works

The portfolio frontend sends the contact form data to the backend. The Express server receives the request and uses Nodemailer to send the message through the configured SMTP server.

Portfolio Website
       |
       | POST /contact
       v
Express API
       |
       v
Nodemailer
       |
       v
SMTP Server
       |
       v
Portfolio Owner's Inbox

API Endpoints

"GET /"

Health/status endpoint for the API.

Response:

"Welcome to Tamil Selvan's Portfolio"

"POST /contact"

Sends a portfolio contact form submission through the configured SMTP server.

Request

POST /contact
Content-Type: application/json

Request Body

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Enquiry",
  "message": "Hello, I would like to discuss a project."
}

Success Response

{
  "message": "Form submitted successfully"
}

Error Response

{
  "message": "Error submitting form."
}

The submitted email address is also configured as the "Reply-To" address, allowing replies to be sent directly to the person who submitted the form.

Environment Variables

Create a ".env" file in the project root:

PORT=5000

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-smtp-password

Configuration

Variable| Description
"PORT"| Port on which the Node.js server runs. Defaults to "5000".
"SMTP_HOST"| SMTP server hostname.
"SMTP_PORT"| SMTP server port, commonly "587" or "465".
"SMTP_SECURE"| Set to "true" when using a secure SMTP connection.
"SMTP_USER"| SMTP username and destination email address.
"SMTP_PASSWORD"| SMTP password or provider-generated SMTP credential.

«Important: Never commit your ".env" file or SMTP credentials to Git.»

Getting Started

1. Clone the repository

git clone https://github.com/tamil-selvan-k/portfolio-smtp-server.git

cd portfolio-smtp-server

2. Install dependencies

npm install

3. Configure environment variables

Create a ".env" file:

PORT=5000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-smtp-password

4. Start the development server

npm run dev

The server will run on:

http://localhost:5000

5. Build for production

npm run build

6. Start the production server

npm start

Available Scripts

Command| Description
"npm run dev"| Starts the server using TypeScript watch mode
"npm run build"| Compiles TypeScript into "dist/"
"npm start"| Starts the compiled production server
"npm run typecheck"| Runs TypeScript type checking without generating files

Testing the API

You can test the contact endpoint using "curl":

curl -X POST http://localhost:5000/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Message",
    "message": "This is a test message."
  }'

Expected response:

{
  "message": "Form submitted successfully"
}

Docker

The project includes a "Dockerfile" for containerized deployment.

Build the Docker image

docker build -t portfolio-smtp-server .

Run the container

docker run --rm \
  -p 5000:5000 \
  --env-file .env \
  portfolio-smtp-server

The API will be available at:

http://localhost:5000

Vercel Deployment

The project includes a Vercel serverless entry point:

api/index.ts

and a Vercel configuration:

vercel.json

The Express application can therefore be deployed as a Vercel serverless function.

Environment Variables

Add the following variables to your Vercel project:

SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASSWORD

After deployment, the API endpoints remain:

GET  /
POST /contact

Project Structure

portfolio-smtp-server/
│
├── api/
│   └── index.ts          # Vercel serverless entry point
│
├── app.ts                # Express application and SMTP logic
│
├── index.ts              # Local Node.js server entry point
│
├── Dockerfile            # Docker configuration
│
├── vercel.json           # Vercel deployment configuration
│
├── tsconfig.json         # TypeScript configuration
│
├── package.json          # Dependencies and scripts
│
├── package-lock.json
│
├── .Dockerignore
├── .gitignore
└── .env                  # Local environment variables

SMTP Configuration

This project uses "Nodemailer" (https://nodemailer.com/) to communicate with the configured SMTP server.

The SMTP transporter is configured using:

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string, 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

This allows the application to work with different SMTP providers without changing the application code.

Security

For production deployments:

- Never expose SMTP credentials in frontend code.
- Never commit ".env" files.
- Use environment variables for all secrets.
- Use TLS/SSL-enabled SMTP connections.
- Consider adding request validation.
- Consider adding rate limiting to prevent spam.
- Consider adding CAPTCHA or another anti-spam mechanism.
- Sanitize user-provided HTML content before rendering it in emails.
- Restrict CORS origins instead of allowing arbitrary origins.

Use Case

This backend is designed specifically to act as the email service for a portfolio website.

Instead of exposing SMTP credentials in the frontend:

Frontend
   |
   | Contact Form
   v
Portfolio SMTP Server
   |
   | Authenticated SMTP
   v
Email Inbox

This keeps the SMTP credentials on the server side while providing a simple API for the portfolio frontend.

License

No license has currently been specified for this repository.
