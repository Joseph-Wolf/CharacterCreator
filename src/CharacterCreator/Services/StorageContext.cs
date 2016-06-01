using CharacterCreator.Models;
using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity.Metadata;



namespace CharacterCreator.Services
{
    public class StorageContext : DbContext
    {
        public DbSet<Character> Characters { get; set; }
        public DbSet<GalleryImage> Image { get; set; }

        public StorageContext() : base() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Character>(y =>
            {
                y.HasMany(x => x.Inventory)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

                y.HasMany(x => x.Gallery)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<InventoryItem>(y =>
            {
                y.HasMany(x => x.Images)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
