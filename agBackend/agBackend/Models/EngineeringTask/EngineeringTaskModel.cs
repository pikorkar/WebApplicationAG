using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace agBackend.Models
{
    public class EngineeringTaskModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int UserStoryId { get; set; }

        public int UserId { get; set; }

        public string Status { get; set; }

        public int EstimatedHours { get; set; }

        public int Priority { get; set; }
    }
}
