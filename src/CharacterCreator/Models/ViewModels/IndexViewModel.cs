using System.Collections.Generic;

namespace CharacterCreator.Models
{
    public class IndexViewModel
    {
        public Character ActiveCharacter { get; set; }
        public IEnumerable<Character> CharacterList { get; set; }
    }
}
