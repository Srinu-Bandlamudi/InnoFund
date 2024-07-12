const projectRepository = require('../repository/campaignForm-repository');

class ProjectService {
    async createProject(projectData) {
        return await projectRepository.create(projectData);
    }

    async getProjectById(projectId) {
        return await projectRepository.findById(projectId);
    }

    async getAllProjects() {
        return await projectRepository.findAll();
    }

    async updateProject(projectId, projectData) {
        return await projectRepository.update(projectId, projectData);
    }

    async deleteProject(projectId) {
        return await projectRepository.delete(projectId);
    }

    async getProjectsByEmail(email) {
        try {
            const projects = await projectRepository.getProjectsByEmail(email);
            return projects;
        } catch (error) {
            console.error('Error in project service:', error.message);
            throw error;
        }
    }
    
}

module.exports = new ProjectService();
