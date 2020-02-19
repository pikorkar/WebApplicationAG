using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace agBackend.Models
{
    public class UserStory
    {
        int Id { get; set; }
        EngineeringTask[] EngineeringTasks { get; set; }

    }
}
