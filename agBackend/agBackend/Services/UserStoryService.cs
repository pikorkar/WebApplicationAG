using System.Collections.Generic;
using agBackend.Models;
using System;
using System.Linq;
using agBackend.Entities;
using agBackend.Helpers;

namespace agBackend.Services
{
    public interface IUserStoryService
    {
    IEnumerable<UserStoryModel> GetAllBySprint(int id);

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
    }
}
