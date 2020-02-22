using System;
using System.ComponentModel.DataAnnotations;

namespace agBackend.Models
{
    public class ProjectCreateModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int SprintLength { get; set; }

        [Required]
        public int NumberOfSprints { get; set; }

        [Required]
        public DateTime StartDate { get; set; }
    }
}
