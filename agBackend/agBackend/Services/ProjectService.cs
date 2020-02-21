using System.Collections.Generic;
using agBackend.Models;
using System;
using System.Linq;
using agBackend.Entities;
using agBackend.Helpers;

namespace agBackend.Services
{

    public interface IProjectService
    {
        IEnumerable<Project> GetAll();
    }

    public class ProjectService : IProjectService
    {
        private DataContext _context;

        public ProjectService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Project> GetAll()
        {
            return _context.Projects;
        }
    }
   
}
