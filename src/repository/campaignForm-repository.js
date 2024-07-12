const Project = require('../models/campaignForm-model');

class ProjectRepository {
    async create(projectData) {
        const project = new Project(projectData);
        return await project.save();
    }

    async findById(projectId) {
        return await Project.findById(projectId);
    }

    async findAll() {
        return await Project.find();
    }

    async update(projectId, projectData) {
        return await Project.findByIdAndUpdate(projectId, projectData, { new: true });
    }

    async delete(projectId) {
        return await Project.findByIdAndDelete(projectId);
    }

    async getProjectsByEmail(email) {
        try {
            const projects = await Project.find({ email: email });
            return projects;
        } catch (error) {
            console.error('Error fetching projects:', error.message);
            throw error;
        }
    }
}

module.exports = new ProjectRepository();
