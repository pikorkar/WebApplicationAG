using agBackend.Helpers;
using agBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace agBackend.Services
{

    public interface IProjectService
    {
        IEnumerable<ProjectModel> GetAll();
        ProjectModel Create(ProjectCreateModel model);
        ProjectModel GetById(int id);
        void Delete(int id);
    }

    public class ProjectService : IProjectService
    {
        private DataContext _context;

        public ProjectService(DataContext context)
        {
            _context = context;
        }

        // GET all
        public IEnumerable<ProjectModel> GetAll()
        {
            return _context.Projects;
        }

        // GET by id
        public ProjectModel GetById(int id)
        {
            return _context.Projects.Find(id);
        }

        // Cerate
        public ProjectModel Create(ProjectCreateModel model)
        {
            if (_context.Projects.Any(x => x.Name == model.Name))
            {
                throw new AppException("Name  \"" + model.Name + "\" is already taken.");
            }

            ProjectModel projectModel = new ProjectModel { Name = model.Name, SprintLength = model.SprintLength, StartDate = model.StartDate };

            _context.Projects.Add(projectModel);
            _context.SaveChanges();

            // Create Sprints in Project by parameter NumberOfSprints
            CreateSprints(projectModel, model.NumberOfSprints);

            return projectModel;
        }

        // Create Sprints in new Project
        private void CreateSprints(ProjectModel model, int numberOfSprints)
        {
            // Creating Sprints with start and end date
            DateTime tmpStartDate = model.StartDate;
            for (int i = 0; i < numberOfSprints; ++i)
            {
                _context.Sprints.Add(new SprintModel { ProjectId = model.Id, StartDate = tmpStartDate, EndDate = tmpStartDate.AddDays(model.SprintLength - 1) });
                tmpStartDate = tmpStartDate.AddDays(model.SprintLength);
            }
            _context.SaveChanges();
        }

        // Delete
        public void Delete(int id)
        {
            var sprints = GetSprints(id);

            foreach (var sprint in sprints)
            {
                var userStories = GetUserStories(sprint.Id);
                foreach (var userStory in userStories) {
                    var engineeringTasks = GetEnginneringTasks(userStory.Id);
                    foreach (var engineeringTask in engineeringTasks)
                    {
                        // First - remove all Engineering tasks
                        _context.EngineeringTasks.Remove(engineeringTask);
                        _context.SaveChanges();
                    }
                    // Second - remove all User Stories
                    _context.UserStories.Remove(userStory);
                    _context.SaveChanges();
                }
                // Third - remove all Sprints
                _context.Sprints.Remove(sprint);
                _context.SaveChanges();
            }
        
            var project = _context.Projects.Find(id);
            if (project != null)
            {
                // Remove Project
                _context.Projects.Remove(project);
                _context.SaveChanges();
            }
        }

        // Find all sprints in Project
        private IEnumerable<SprintModel> GetSprints(int id)
        {
            return _context.Sprints.Where(x => x.ProjectId == id).ToList();
        }

        // Find all User Stories in Sprint
        private IEnumerable<UserStoryModel> GetUserStories(int id)
        {
            return _context.UserStories.Where(x => x.SprintId == id).ToList();
        }

        // Fins all Engineering Tasks in User Story
        private IEnumerable<EngineeringTaskModel> GetEnginneringTasks(int id)
        {
            return _context.EngineeringTasks.Where(x => x.UserStoryId == id).ToList();
        }
    }
   
}
