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
        void Update(UserStoryModel userStoryParam);
        UserStoryModel GetById(int id);
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

        public void Update(UserStoryModel userStoryParam)
        {
            var userStory = _context.UserStories.Find(userStoryParam.Id);

            if (userStory == null)
                throw new AppException("User Story not found.");

            if (!string.IsNullOrWhiteSpace(userStoryParam.Name) && userStoryParam.Name != userStory.Name)
            {
                if (_context.UserStories.Any(x => x.Name == userStoryParam.Name))
                    throw new AppException("Name \"" + userStory.Name + "\" is already taken.");

                userStory.Name = userStoryParam.Name;
            }

            if (userStoryParam.SprintId > 0)
                userStory.SprintId = userStoryParam.SprintId;

            _context.UserStories.Update(userStory);
            _context.SaveChanges();
        }

        public UserStoryModel GetById(int id)
        {
            return _context.UserStories.Find(id);
        }
    }
}
