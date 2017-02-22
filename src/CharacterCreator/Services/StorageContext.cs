using CharacterCreator.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CharacterCreator.Services
{
    public class StorageContext : DbContext
    {
        public DbSet<Character> Characters { get; set; }

        public StorageContext(DbContextOptions<StorageContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<InventoryItem>()
                .HasMany(x => x.Images)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<InventoryItem>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<Character>()
                .HasMany(x => x.Inventory)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Character>()
                .HasMany(x => x.Gallery)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Character>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<InventoryImage>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<GalleryImage>()
                .HasKey(x => x.Id);
        }
    }
}
