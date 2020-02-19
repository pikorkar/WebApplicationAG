using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace agBackend.Models
{
    public class Sprint
    {
        int Id { get; set; }
        UserStory[] userStory { get; set; }
    }
}
