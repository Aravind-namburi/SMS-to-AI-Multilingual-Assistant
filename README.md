# SMS-to-AI Multilingual Assistant

This project enables users to send SMS messages in any language and receive AI-generated responses via OpenAI's GPT-3. It uses Twilio for SMS, Google Cloud Translation API for language detection and translation, and is designed for deployment on AWS Lambda.

## Overview

- **Project Name**: SMS-to-AI Multilingual Assistant
- **Technologies Used**: Node.js (Express), Twilio API, OpenAI API (GPT-3), Google Cloud Translation API, AWS Lambda (serverless)
- **Description**: This project provides an interface that allows users to send SMS messages to an AI assistant. The assistant understands and replies in over 100+ languages. The backend detects the language, translates the message to English, sends it to OpenAI's GPT-3, translates the response back, and sends it via SMS.

## Features

- SMS communication via Twilio
- Multilingual input and output using Google Cloud Translation
- OpenAI GPT-3 integration for intelligent responses
- Real-time language detection and response translation
- Health/Medical-specific response formatting (within 200 characters)
- Deployment-ready for AWS Lambda

## Setup Instructions

### 1. Prerequisites

- Node.js and npm installed
- Twilio account (with phone number)
- OpenAI API key
- Google Cloud Platform project and credentials for Translation API

### 2. Environment Variables

Create a `.env` file in the root directory and add the following:

```
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_cloud_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

### 3. Install Dependencies

```bash
npm install express twilio googleapis openai dotenv
```

### 4. Run the Server Locally

```bash
node openAI.js
```

### 5. Deploy to AWS Lambda (Optional)

If deploying to AWS Lambda, wrap the Express app using `serverless-http`:

```js
const serverless = require('serverless-http');
module.exports.handler = serverless(app);
```

Then deploy using a framework like Serverless Framework.

## Usage

1. Send a message in any language to the configured Twilio number.
2. The system detects the language and translates it to English.
3. The message is passed to OpenAI GPT-3.
4. GPT-3 generates a health/medical-context reply (≤ 200 characters).
5. The reply is translated back and sent to the user via SMS.

## Example

User sends (in Spanish): `¿Qué debo hacer si tengo fiebre alta?`  
System response (in Spanish): `Consulta a un médico. Mantente hidratado y descansa.`

## Author

- **Your Name**: Replace with your actual name
- **Contact**: Replace with your email or GitHub

## License

This project is for educational/demo purposes.

> **Note:**
- The API key in `openAI.js` at **line 6** has been intentionally removed for privacy and billing protection.
- To run the project, insert your **OpenAI API Key** at **line 50** as an environment variable (`OPENAI_API_KEY`).
