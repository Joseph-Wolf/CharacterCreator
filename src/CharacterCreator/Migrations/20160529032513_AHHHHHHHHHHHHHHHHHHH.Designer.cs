using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using CharacterCreator.Services;

namespace CharacterCreator.Migrations
{
    [DbContext(typeof(StorageContext))]
    [Migration("20160529032513_AHHHHHHHHHHHHHHHHHHH")]
    partial class AHHHHHHHHHHHHHHHHHHH
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

                    b.Property<string>("GalleryAsString");

                    b.Property<string>("Gender");

                    b.Property<string>("Name");

                    b.Property<Guid>("ProfileImage");

                    b.Property<string>("Race");

                    b.Property<string>("Summary");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("CharacterCreator.Models.Image", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("Bytes");

                    b.Property<Guid?>("ForeignId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("CharacterCreator.Models.InventoryItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("CharacterId");

                    b.Property<string>("Description");

                    b.Property<Guid>("Image");

                    b.Property<string>("ImagesAsString");

                    b.Property<string>("Name");

                    b.HasKey("Id");
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
