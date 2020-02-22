using System.Collections.Generic;
using agBackend.Models;
using System;
using System.Linq;
using agBackend.Entities;
using agBackend.Helpers;


namespace agBackend.Services
{
    public interface ISprintService
    {
        IEnumerable<SprintModel> GetAllByProject(int id);
    }

    public class SprintService : ISprintService
    {
        private DataContext _context;

        public SprintService(DataContext context) {
            _context = context;
        }

        public IEnumerable<SprintModel> GetAllByProject(int id)
        {
            return _context.Sprints.Where(x => x.ProjectId == id);
        }
    }
}
