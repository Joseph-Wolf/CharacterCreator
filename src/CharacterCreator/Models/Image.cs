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
        public static GalleryImage FromStream(Stream s)
        {
            var Output = new GalleryImage();
            using (var ms = new MemoryStream())
            {
                s.CopyTo(ms);
                Output.Bytes = ms.ToArray();
            }
            return Output;
        }
    }
    public class InventoryImage
    {
        public Guid Id { get; set; }
        public byte[] Bytes { get; set; }
        public static InventoryImage FromStream(Stream s)
        {
            var Output = new InventoryImage();
            using (var ms = new MemoryStream())
            {
                s.CopyTo(ms);
                Output.Bytes = ms.ToArray();
            }
            return Output;
        }
    }
}
