namespace agBackend.Models
{
    public class EngineeringTaskUpdateModel
    {
        public string Name { get; set; }

        public int UserStoryId { get; set; }

        public int UserId { get; set; }

        public string Status { get; set; }

        public int EstimatedHours { get; set; }

        public int Priority { get; set; }

        public int DoneHours { get; set; }
    }
}
