using agBackend.Helpers;
using agBackend.Models;
using System.Collections.Generic;
using System.Linq;

namespace agBackend.Services
{
    public interface IEngineeringTaskService
    {
        IEnumerable<EngineeringTaskModel> GetAllByUserStory(int id);
        EngineeringTaskModel Create(EngineeringTaskCreateModel model);

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

        public EngineeringTaskModel Create(EngineeringTaskCreateModel model)
        {
            if (_context.EngineeringTasks.Any(x => x.Name == model.Name))
            {
                throw new AppException("Name is already taken.");
            }

            EngineeringTaskModel engineeringTaskModel = new EngineeringTaskModel { Name = model.Name, UserStoryId = model.UserStoryId,
                UserId = model.UserId, Status = model.Status, EstimatedHours = model.EstimatedHours, Priority = model.Priority};
            
            _context.EngineeringTasks.Add(engineeringTaskModel);
            _context.SaveChanges();

            return engineeringTaskModel;
        }
    }
}
