# AI Interview Report Generator

A backend project that generates an **AI-based interview report from a candidate's information**.

The application takes a **PDF resume, self description and job description**, extracts its content, and sends it to an AI model to generate an **interview-style report** including match score and technical interview questions.

This project was built mainly to **practice backend development, API design, and integrating AI services into a real-world workflow**.

---

## Features

- Upload a candidate **resume (PDF)**
- Extract text from the resume
- Send extracted content to an **AI model**
- Generate an **AI interview report**
- Store the generated report in **MongoDB**
- Return structured interview questions and evaluation

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### AI Integration
- Google Generative AI API


---

## Limitations

- AI responses are not always perfectly structured.
- API quota limits can stop report generation.
- Currently supports only **PDF resumes**.
- Error handling can be improved.

---

## Possible Improvements

- Better prompt engineering for structured responses
- Resume skill extraction
- Frontend interface
- Authentication system
- Support for more resume formats
- Improved error handling

---

## Why I Built This

I built this project to practice:

- Backend architecture
- AI API integration
- File uploads in Node.js
- PDF data extraction
- Building real-world APIs

