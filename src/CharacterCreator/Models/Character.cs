using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public class Character
    {
        public Guid id { get; set; }
        [Display(Name = "Name")]
        public String Name { get; set; }
        [Display(Name = "Gender")]
        public String Gender { get; set; }
        [Display(Name = "Race")]
        public String Race { get; set; }
    }
}
