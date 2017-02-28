using System.Collections.Generic;

namespace CharacterCreator.Models
{
    public abstract class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
    public class InventoryItem : Item
    {
        public ICollection<InventoryImage> Images { get; set; } = new List<InventoryImage>();
    }
}
