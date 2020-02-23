using System.ComponentModel.DataAnnotations;

namespace agBackend.Models
{
    public class UserStoryCreateModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int SprintId { get; set; }
    }
}
