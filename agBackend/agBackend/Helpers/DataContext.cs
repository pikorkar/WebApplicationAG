using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using agBackend.Entities;
using agBackend.Models;

namespace agBackend.Helpers
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration) {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options) {
            // connect to database SQL
            options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
        }

        public DbSet<User> Users { get; set;  }
        public DbSet<SprintModel> Sprints { get; set; }
        public DbSet<ProjectModel> Projects { get; set; }
        public DbSet<UserStoryModel> UserStories { get; set; }
        public DbSet<EngineeringTaskModel> EngineeringTasks { get; set; }

    }
}

