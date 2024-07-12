const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    projectType: { type: String, required: true },
    projectDescription: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    goalMoney: { type: Number, required: true },
    pledgeMoney: { type: Number, required: true }, // Added pledge_money field
    scheme: { type: String, required: true }, // Added scheme field
    email:{type:String,required:true},
    projectVideoUrl: { type: String, required: true },
    teamMembers: { type: [String], required: true } // Changed to array of strings for team_members
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
