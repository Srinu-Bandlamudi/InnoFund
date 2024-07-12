const projectService = require('../services/campaignForm-services');

class ProjectController {
    async createProject(req, res) {
        try {
            console.log("req body check",req.body);
            const project = await projectService.createProject(req.body);
            res.status(201).json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async  getProjectsByEmail(req, res, next) {
        try {
            const { email } = req.params;
            const projects = await projectService.getProjectsByEmail(email);
            res.json(projects);
        } catch (error) {
            next(error);
        }
    }

    async getProjectById(req, res) {
        try {
            const project = await projectService.getProjectById(req.params.id);
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllProjects(req, res) {
        try {
            const projects = await projectService.getAllProjects();
            res.status(200).json(projects);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateProject(req, res) {
        try {
            const project = await projectService.updateProject(req.params.id, req.body);
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProject(req, res) {
        try {
            const project = await projectService.deleteProject(req.params.id);
            if (project) {
                res.status(200).json({ message: 'Project deleted successfully' });
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ProjectController();
