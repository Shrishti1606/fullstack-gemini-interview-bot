const mongoose = require('mongoose');


/**
 * -job description schema : string
 * -resume : string
 * -self description : string
 * 
 * -matchScore: number
 * 
 * -technical question :-
 *      [{
 *         ques: ""
 *    intention: ""
 *       answer: ""
 *           }]
 * -behavioral questions :- 
 *       [{
 *         ques: ""
 *    intention: ""
 *       answer: ""
 *           }]
 * -skilgaps :-
 *       [{
 *         skill: ""   
 *      severity:( "" 
 *          type: string
 *          enum: ["low", "medium", "high"]
 *              )        
 *             }]
 * -preparation plan :-
 *        [{
 *           day: number
 *         focus: string
 *         tasks: [string]
 *             }]
 */

const technicalQuestionSchema = new mongoose.Schema({
    
    question: {
        type: String,
        required: [ true, "Technical question is required" ]
    },
    intention: {
        type: String,
        required: [ true, "Intention is required" ]
    },
    answer: {
        type: String,
        required: [ true, "Answer is required" ]
    }

}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    
    question: {
        type: String,
        required: [ true, "behavioral question is required" ]
    },
    intention: {
        type: String,
        required: [ true, "Intention is required" ]
    },
    answer: {
        type: String,
        required: [ true, "Answer is required" ]
    }

}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    
    skill: {
        type: String,
        required: [ true, "skill is required" ]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [ true, "severity is required" ]
    }

}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({

    day: {
        type: Number,
        required: [ true, "Day is required" ]
    },
    focus: {
        type: String,
        required: [ true, "focus is required" ]
    },
    tasks: [{
        type: String,
        required: [ true, "Task is required" ]
    }]

})

const interviewReportSchema = new mongoose.Schema({

    jobDescription: {
        type: String,
        required: [true, "job description is required"],
    },
    resumeText: {
        type: String,
    },
    selfDescription: {
        type: String 
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGaps : [skillGapSchema],
    preparationPlan : [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        require: [true, "job title is required"]
    }

}, {
    timestamps: true
})


const interviewReportModel = new mongoose.model("interviewReport", interviewReportSchema)


module.exports = interviewReportModel


