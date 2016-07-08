using Microsoft.AspNet.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public class GalleryImage
    {
        public Guid Id { get; set; }
        public byte[] Bytes { get; set; }
        public GalleryImage() { }
        public GalleryImage(Stream s)
        {
            using (var ms = new MemoryStream())
            {
                s.CopyTo(ms);
                Bytes = ms.ToArray();
            }
        }
        public string GetSrc()
        {
            return String.Concat("data:image/jpeg;base64,", Convert.ToBase64String(Bytes));
        }
    }
    public class InventoryImage
    {
        public Guid Id { get; set; }
        public byte[] Bytes { get; set; }
        public InventoryImage() { }
        public InventoryImage(Stream s)
        {
            using (var ms = new MemoryStream())
            {
                s.CopyTo(ms);
                Bytes = ms.ToArray();
            }
        }
        public string GetSrc()
        {
            return String.Concat("data:image/jpeg;base64,", Convert.ToBase64String(Bytes));
        }
    }
}
