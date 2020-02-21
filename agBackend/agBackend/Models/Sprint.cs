using System;

namespace agBackend.Models
{
    public class Sprint
    {
        public int Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int ProjectId { get; set; }
    }
}
