using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace agBackend.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SprintLength { get; set; }
    }
}
