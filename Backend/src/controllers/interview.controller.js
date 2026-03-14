const pdfParse = require("pdf-parse")
const {generateInterviewReport} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model")


const generateInterviewReportController = async (req, res) => {

    // const { selfDescription, jobDescription } = req.body

    if (!req.file && !selfDescription) {
        return res.status(400).json({
            message: "Provide either resume or self description"
        })
    }

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

const getInterviewReportByIdController = async (req, res) => {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

//Controller to get all interview reports of logged in user.
const getAllInterviewReportsController = async (req, res) => {

    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })

}


module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController }