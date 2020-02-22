using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace agBackend.Models
{
    public class ProjectModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SprintLength { get; set; }
        public DateTime StartDate { get; set; }
    }
}
