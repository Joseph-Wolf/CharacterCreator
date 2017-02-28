using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public abstract class Item
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
    }

    public class InventoryItem : Item
    {
        public ICollection<InventoryImage> Images { get; set; } = new List<InventoryImage>();
    }
}
