using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using CharacterCreator.Services;

namespace CharacterCreator.Migrations
{
    [DbContext(typeof(StorageContext))]
    partial class StorageContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CharacterCreator.Models.Character", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Gender");

                    b.Property<string>("Name");

                    b.Property<string>("Race");

                    b.Property<string>("Summary");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("CharacterCreator.Models.GalleryImage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("Bytes");

                    b.Property<Guid?>("CharacterId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("CharacterCreator.Models.InventoryImage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("Bytes");

                    b.Property<Guid?>("InventoryItemId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("CharacterCreator.Models.InventoryItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("CharacterId");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("CharacterCreator.Models.GalleryImage", b =>
                {
                    b.HasOne("CharacterCreator.Models.Character")
                        .WithMany()
                        .HasForeignKey("CharacterId");
                });

            modelBuilder.Entity("CharacterCreator.Models.InventoryImage", b =>
                {
                    b.HasOne("CharacterCreator.Models.InventoryItem")
                        .WithMany()
                        .HasForeignKey("InventoryItemId");
                });

            modelBuilder.Entity("CharacterCreator.Models.InventoryItem", b =>
                {
                    b.HasOne("CharacterCreator.Models.Character")
                        .WithMany()
                        .HasForeignKey("CharacterId");
                });
        }
    }
}
