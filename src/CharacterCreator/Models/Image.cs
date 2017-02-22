using Newtonsoft.Json;
using System;
using System.IO;

namespace CharacterCreator.Models
{
    public class Image
    {
        public int Id { get; set; }
        public byte[] Bytes { get; set; }
        public Image() { }
        public Image(Stream s)
        {
            using (var ms = new MemoryStream())
            {
                s.CopyTo(ms);
                Bytes = ms.ToArray();
            }
        }
        [JsonIgnore]
        public string Src
        {
            get
            {
                return String.Concat("data:image/jpeg;base64,", Convert.ToBase64String(Bytes));
            }
        }
    }
    public class GalleryImage : Image {
        public GalleryImage (): base() { }
        public GalleryImage (Stream s): base(s) { }
        public bool IsProfile { get; set; } = false;
    }
    public class InventoryImage : Image {
        public InventoryImage(): base() { }
        public InventoryImage(Stream s): base(s) { }
    }
}
