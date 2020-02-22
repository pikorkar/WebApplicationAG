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
            // options.UseSqlServer(Configuration.GetConnectionString("Provider=SQLOLEDB.1;Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=agDatabase;Data Source=LAPTOP-6918CLND;"));
            options.UseSqlServer("Data Source=LAPTOP-6918CLND;Initial Catalog=agDatabase;Persist Security Info=False;Integrated Security=SSPI;");
        }

        public DbSet<User> Users { get; set;  }
        public DbSet<SprintModel> Sprints { get; set; }
        public DbSet<ProjectModel> Projects { get; set; }
        public DbSet<UserStoryModel> UserStories { get; set; }
        public DbSet<EngineeringTaskModel> EngineeringTasks { get; set; }

    }
}

