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
    }

    public class ProjectService : IProjectService
    {
        private DataContext _context;

        public ProjectService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<ProjectModel> GetAll()
        {
            return _context.Projects;
        }

        public ProjectModel Create(ProjectCreateModel model)
        {
            if (_context.Projects.Any(x => x.Name == model.Name))
            {
                throw new AppException("Name is already taken.");
            }

            ProjectModel projectModel = new ProjectModel { Name = model.Name, SprintLength = model.SprintLength, StartDate = model.StartDate };

            _context.Projects.Add(projectModel);
            _context.SaveChanges();

            CreateSprints(projectModel, model.NumberOfSprints);

            return projectModel;
        }

        private void CreateSprints(ProjectModel model, int numberOfSprints)
        {
            DateTime tmpStartDate = model.StartDate;
            for (int i = 0; i < numberOfSprints; ++i)
            {
                _context.Sprints.Add(new SprintModel { ProjectId = model.Id, StartDate = tmpStartDate, EndDate = tmpStartDate.AddDays(model.SprintLength - 1) });
                tmpStartDate = tmpStartDate.AddDays(model.SprintLength);
            }
            _context.SaveChanges();
        }
    }
   
}
