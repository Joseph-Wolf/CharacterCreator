using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public class InventoryItem
    {
        private char ArraySeparator = ',';
        public Guid Id { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
        public Guid Image { get; set; }
        private ICollection<Guid> images;
        public ICollection<Guid> Images
        {
            get
            {
                if (images == default(ICollection<Guid>))
                {
                    images = new List<Guid>();
                }
                return images;
            }
            set
            {
                images = value;
            }
        }
        public String ImagesAsString
        {
            get
            {
                return String.Join(ArraySeparator.ToString(), Images);
            }
            set
            {
                Images = value.Split(ArraySeparator).Where(x => { Guid i; return Guid.TryParse(x, out i); }).Select(x => Guid.Parse(x)).ToList();
            }
        }
    }
}
