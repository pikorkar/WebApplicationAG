using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace agBackend.Models
{
    public class UpdateModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
