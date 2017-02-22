using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CharacterCreator.Models
{
    public class Character
    {
        public int Id { get; set; }
        [Display(Name = "Name")]
        public string Name { get; set; }
        [Display(Name = "Gender")]
        public string Gender { get; set; }
        [Display(Name = "Race")]
        public string Race { get; set; }
        public string Summary { get; set; }
        public ICollection<GalleryImage> Gallery { get; set; } = new List<GalleryImage>();
        public ICollection<InventoryItem> Inventory { get; set; } = new List<InventoryItem>();
        [JsonIgnore]
        public GalleryImage ProfileImage
        {
            get
            {
                //Return image where IsProfile is set
                if (Gallery.Any(x => x.IsProfile))
                {
                    return Gallery.Single(x => x.IsProfile);
                }
                //If none found then return first
                return Gallery.FirstOrDefault();
            }
            set
            {
                //set all images to non profiles
                foreach (var item in Gallery.Where(x => x.IsProfile))
                {
                    item.IsProfile = false;
                }
                //Set the profile image from its Id
                Gallery.Where(x => x.Id == value.Id).Single().IsProfile = true;
            }
        }
    }
}
