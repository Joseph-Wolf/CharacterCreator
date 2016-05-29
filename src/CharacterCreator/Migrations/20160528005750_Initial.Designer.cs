using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using CharacterCreator.Services;

namespace CharacterCreator.Migrations
{
    [DbContext(typeof(StorageContext))]
    [Migration("20160528005750_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<byte[]>("ProfileImage");

                    b.Property<string>("Race");

                    b.Property<string>("Summary");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("CharacterCreator.Models.GalleryItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("CharacterId")
                        .IsRequired();

                    b.Property<string>("Description");

                    b.Property<byte[]>("Image");

                    b.Property<string>("Name");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("CharacterCreator.Models.InventoryItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("CharacterId")
                        .IsRequired();

                    b.Property<string>("Description");

                    b.Property<byte[]>("Image");

                    b.Property<string>("Name");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("CharacterCreator.Models.GalleryItem", b =>
                {
                    b.HasOne("CharacterCreator.Models.Character")
                        .WithMany()
                        .HasForeignKey("CharacterId");
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
