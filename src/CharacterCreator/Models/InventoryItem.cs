using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public class InventoryItem
    {
        public Guid Id { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
        private ICollection<InventoryImage> images;
        public ICollection<InventoryImage> Images
        {
            get
            {
                if (images == default(ICollection<InventoryImage>))
                {
                    images = new List<InventoryImage>();
                }
                return images;
            }
            set
            {
                images = value;
            }
        }
    }
}
