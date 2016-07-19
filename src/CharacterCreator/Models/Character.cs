using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public class Character
    {
        public Guid Id { get; set; }
        [Display(Name = "Name")]
        public String Name { get; set; }
        [Display(Name = "Gender")]
        public String Gender { get; set; }
        [Display(Name = "Race")]
        public String Race { get; set; }
        public String Summary { get; set; }
        private GalleryImage profileImage;
        public GalleryImage ProfileImage
        {
            get
            {
                if(profileImage == default(GalleryImage) && Gallery.Any())
                {
                    profileImage = Gallery.First();
                }
                return profileImage;
            }
            set
            {
                profileImage = value;
            }
        }
        public ICollection<GalleryImage> Gallery { get; set; } = new List<GalleryImage>();

        public ICollection<InventoryItem> Inventory { get; set; } = new List<InventoryItem>();
    }
}
