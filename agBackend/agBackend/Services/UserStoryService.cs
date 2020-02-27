using System.Collections.Generic;
using agBackend.Models;
using System;
using System.Linq;
using agBackend.Helpers;

namespace agBackend.Services
{
    public interface IUserStoryService
    {
        IEnumerable<UserStoryModel> GetAllBySprint(int id);
        UserStoryModel Create(UserStoryModel model);
        IEnumerable<UserStoryModel> GetAllByProject(int id);
        void Delete(int id);
    }

    public class UserStoryService : IUserStoryService
    {
        private DataContext _context;

        public UserStoryService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<UserStoryModel> GetAllBySprint(int id)
        {
            return _context.UserStories.Where(x => x.SprintId == id);
        }

        public UserStoryModel Create(UserStoryModel model)
        {
            if (_context.UserStories.Any(x => x.Name == model.Name))
            {
                throw new AppException("Name is already taken.");
            }

            _context.UserStories.Add(model);
            _context.SaveChanges();

            return model;
        }

        public IEnumerable<UserStoryModel> GetAllByProject(int id)
        {
            int[] sprintIdsArray = _context.Sprints.Where(x => x.ProjectId == id).Select(x => x.Id).ToArray();

            return _context.UserStories.Where(x => sprintIdsArray.Contains(x.SprintId));
        }

        public void Delete(int id)
        {
            var engineeringTasks = GetEnginneringTasks(id);
            
            foreach (var engineeringTask in engineeringTasks)
            {
                _context.EngineeringTasks.Remove(engineeringTask);
                _context.SaveChanges();
            }

            var usserStory = _context.UserStories.Find(id);
            if (usserStory != null)
            {
                _context.UserStories.Remove(usserStory);
                _context.SaveChanges();
            }
        }

        private IEnumerable<EngineeringTaskModel> GetEnginneringTasks(int id) {
            return _context.EngineeringTasks.Where(x => x.UserStoryId == id).ToList();
        }
    }
}
