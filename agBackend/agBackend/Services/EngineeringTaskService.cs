using System.Collections.Generic;
using agBackend.Models;
using System;
using System.Linq;
using agBackend.Entities;
using agBackend.Helpers;

namespace agBackend.Services
{
    public interface IEngineeringTaskService
    {
        IEnumerable<EngineeringTaskModel> GetAllByUserStory(int id);

    }
    public class EngineeringTaskService : IEngineeringTaskService
    {
        private DataContext _context;

        public EngineeringTaskService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<EngineeringTaskModel> GetAllByUserStory(int id)
        {
            return _context.EngineeringTasks.Where(x => x.UserStoryId == id);
        }
    }
}
