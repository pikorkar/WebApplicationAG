using agBackend.Helpers;
using agBackend.Models;
using System.Collections.Generic;
using System.Linq;

namespace agBackend.Services
{
    public interface IEngineeringTaskService
    {
        IEnumerable<EngineeringTaskModel> GetAllByUserStory(int id);
        EngineeringTaskModel Create(EngineeringTaskModel model);
        void Update(EngineeringTaskModel engineeringTaskParam);
        EngineeringTaskModel GetById(int id);

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

        public EngineeringTaskModel Create(EngineeringTaskModel model)
        {
            if (_context.EngineeringTasks.Any(x => x.Name == model.Name))
            {
                throw new AppException("Name is already taken.");
            }

            model.DoneHours = 0;
            _context.EngineeringTasks.Add(model);
            _context.SaveChanges();

            return model;
        }

        public void Update(EngineeringTaskModel engineeringTaskParam)
        {
            var engineeringTask = _context.EngineeringTasks.Find(engineeringTaskParam.Id);

            if (engineeringTask == null)
                throw new AppException("Engineering task not found.");

            if (!string.IsNullOrWhiteSpace(engineeringTask.Name) && engineeringTaskParam.Name != engineeringTask.Name)
            {
                if (_context.EngineeringTasks.Any(x => x.Name == engineeringTaskParam.Name))
                    throw new AppException("Name " + engineeringTask.Name + "is already taken.");

                engineeringTask.Name = engineeringTaskParam.Name;
            }

            if (engineeringTaskParam.UserStoryId > 0)
                engineeringTask.UserStoryId = engineeringTaskParam.UserStoryId;

            if (engineeringTaskParam.UserId > 0)
                engineeringTask.UserId = engineeringTaskParam.UserId;

            if (!string.IsNullOrWhiteSpace(engineeringTaskParam.Status))
                engineeringTask.Status = engineeringTaskParam.Status;

            if (engineeringTaskParam.EstimatedHours > 0)
                engineeringTask.EstimatedHours = engineeringTaskParam.EstimatedHours;

            if (engineeringTaskParam.Priority > 0)
                engineeringTask.Priority = engineeringTaskParam.Priority;

            if (engineeringTaskParam.DoneHours > 0)
                engineeringTask.DoneHours = engineeringTaskParam.DoneHours;

            _context.EngineeringTasks.Update(engineeringTask);
            _context.SaveChanges();
        }

        public EngineeringTaskModel GetById(int id)
        {
            return _context.EngineeringTasks.Find(id);
        }
    }
}
