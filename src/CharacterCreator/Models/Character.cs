using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public class Character
    {
        private char ArraySeparator = ',';

        public Guid Id { get; set; }
        [Display(Name = "Name")]
        public String Name { get; set; }
        [Display(Name = "Gender")]
        public String Gender { get; set; }
        [Display(Name = "Race")]
        public String Race { get; set; }
        public String Summary { get; set; }
        public Guid ProfileImage { get; set; }
        private ICollection<Guid> gallery;
        public ICollection<Guid> Gallery
        {   get
            {
                if(gallery == default(ICollection<Guid>))
                {
                    gallery = new List<Guid>();
                }
                return gallery;
            }
            set { gallery = value; }
        }
        public String GalleryAsString
        {
            get
            {
                return String.Join(ArraySeparator.ToString(), Gallery.Select(x => x.ToString()).ToList());
            }
            set
            {
                Gallery = value.Split(ArraySeparator).Where(x => { Guid i; return Guid.TryParse(x, out i); }).Select(x => Guid.Parse(x)).ToList();
            }
        }

        private ICollection<InventoryItem> inventory;
        public ICollection<InventoryItem> Inventory {
            get
            {
                if(inventory == default(ICollection<InventoryItem>))
                {
                    inventory = new List<InventoryItem>();
                }
                return inventory;
            }
            set { inventory = value; }
        }
        
    }
}
