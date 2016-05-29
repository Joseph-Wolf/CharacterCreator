using Microsoft.AspNet.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public class Image
    {
        public Guid Id { get; set; }
        public byte[] Bytes { get; set; }
        public Image FromStream(Stream s)
        {
            using (var ms = new MemoryStream())
            {
                s.CopyTo(ms);
                this.Bytes = ms.ToArray();
            }
            return this;
        }
    }
}
