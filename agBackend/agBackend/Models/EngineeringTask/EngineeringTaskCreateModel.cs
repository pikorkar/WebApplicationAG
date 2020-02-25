using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace agBackend.Models
{
    public class EngineeringTaskCreateModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int UserStoryId { get; set;  }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public int EstimatedHours { get; set;  }

        [Required]
        public int Priority { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
