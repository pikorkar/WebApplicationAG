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
            if (_context.Projects.Any(x => x.Name == model.Name))
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
    }
}
