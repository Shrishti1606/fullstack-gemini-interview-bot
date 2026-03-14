const { GoogleGenAI, Models } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

//     const prompt = `
//         Analyze the job description and resume.

//         Generate a structured interview preparation report.

//         Return STRICT JSON only with the following format:

//             {
//             matchScore: number,
//             technicalQuestions: [
//                 {
//                 question: string,
//                 intention: string,
//                 answer: string
//                 }
//             ],
//             behavioralQuestions: [
//                 {
//                 question: string,
//                 intention: string,
//                 answer: string
//                 }
//             ],
//             skillGaps: [
//                 {
//                 skill: string,
//                 severity: "low | medium | high"
//                 }
//             ],
//             preparationPlan: [
//                 {
//                 day: number,
//                 focus: string,
//                 tasks: string[]
//                 }
//             ]
//         }

//         use the following resume and job description.

//         Resume:
//         ${resume}

//         Self Description:
//         ${selfDescription}

//         Job Description:
//         ${jobDescription}

//         Rules:
//         - Every field must be filled.
//         - The "answer" field must contain a clear interview-ready answer (3–5 sentences).
//         - Do not return empty values.
//         - Do not return strings containing JSON. Return actual JSON objects.
//         - Do not include explanations outside JSON.

//         If you cannot generate an answer, still provide your best possible explanation instead of leaving the field empty.
//     `;

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//         }
//     })

//     const text = response.candidates[0].content.parts[0].text
//     return JSON.parse(text)


// }

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    // 1. Clean up the prompt to focus on DATA, not formatting
    const prompt = `
        Analyze the following resume and job description to generate a structured interview report.
        
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}

        Rules:
        - Every field must be filled.
        - The "answer" field must contain a clear interview-ready answer (3–5 sentences).
        - If you cannot generate an answer, provide the best possible explanation.
    `;

    try {

        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        const responseText = result.text;

        return JSON.parse(responseText);

    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
}



module.exports = { generateInterviewReport }

