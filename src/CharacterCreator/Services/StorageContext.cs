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
        public DbSet<Image> Image { get; set; }

        public StorageContext() : base() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Generate Character Id
            modelBuilder.Entity<Character>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd()
                .IsRequired();
            modelBuilder.Entity<Character>()
                .Ignore(x => x.Gallery);
            modelBuilder.Entity<Character>()
                .Property(x => x.GalleryAsString)
                .IsRequired();

            modelBuilder.Entity<InventoryItem>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd()
                .IsRequired();
            modelBuilder.Entity<InventoryItem>()
                .Ignore(x => x.Images);
            modelBuilder.Entity<InventoryItem>()
                .Property(x => x.ImagesAsString)
                .IsRequired();

            modelBuilder.Entity<Image>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd()
                .IsRequired();
        }
    }
}
