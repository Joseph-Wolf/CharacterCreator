using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public class IndexViewModel
    {
        public Character ActiveCharacter { get; set; }
        public IEnumerable<Character> CharacterList { get; set; }
    }
}
