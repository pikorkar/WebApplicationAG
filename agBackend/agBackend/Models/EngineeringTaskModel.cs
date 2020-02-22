using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace agBackend.Models
{
    public class EngineeringTaskModel
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public int UserStoryId { get; set; }
    }
}
