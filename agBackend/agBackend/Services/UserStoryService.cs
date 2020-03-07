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

        // Get all by Project
        public IEnumerable<UserStoryModel> GetAllByProject(int id)
        {
            // Find all Sprints in Project in which is this User Story
            int[] sprintIdsArray = _context.Sprints.Where(x => x.ProjectId == id).Select(x => x.Id).ToArray();

            return _context.UserStories.Where(x => sprintIdsArray.Contains(x.SprintId));
        }

        // GET all by Sprint
        public IEnumerable<UserStoryModel> GetAllBySprint(int id)
        {
            return _context.UserStories.Where(x => x.SprintId == id);
        }

        // GET by id
        public UserStoryModel GetById(int id)
        {
            return _context.UserStories.Find(id);
        }

        // Create
        public UserStoryModel Create(UserStoryModel model)
        {
            if (_context.UserStories.Any(x => x.Name == model.Name))
            {
                throw new AppException("Name \"" + model.Name + "\" is already taken.");
            }

            _context.UserStories.Add(model);
            _context.SaveChanges();

            return model;
        }

        // Update
        public void Update(UserStoryModel userStoryParam)
        {
            var userStory = _context.UserStories.Find(userStoryParam.Id);

            // Not found
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

        // Delete
        public void Delete(int id)
        {
            var engineeringTasks = GetEnginneringTasks(id);
            
            foreach (var engineeringTask in engineeringTasks)
            {
                // Remove all Engineering Tasks in User Story
                _context.EngineeringTasks.Remove(engineeringTask);
                _context.SaveChanges();
            }

            var usserStory = _context.UserStories.Find(id);
            if (usserStory != null)
            {
                // Remove User Story
                _context.UserStories.Remove(usserStory);
                _context.SaveChanges();
            }
        }

        // Find all Engineering tasks in User Storys
        private IEnumerable<EngineeringTaskModel> GetEnginneringTasks(int id) {
            return _context.EngineeringTasks.Where(x => x.UserStoryId == id).ToList();
        }

    }
}
