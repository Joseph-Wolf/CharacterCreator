using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace CharacterCreator.Migrations
{
    public partial class AHHHHHHHHH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "Image", table: "InventoryItem");
            migrationBuilder.DropColumn(name: "ProfileImage", table: "Character");
            migrationBuilder.DropTable("GalleryItem");
            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Bytes = table.Column<byte[]>(nullable: true),
                    ForeignId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Image_Character_ForeignId",
                        column: x => x.ForeignId,
                        principalTable: "Character",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
            migrationBuilder.AlterColumn<Guid>(
                name: "CharacterId",
                table: "InventoryItem",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "PictureId",
                table: "InventoryItem",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "ProfileImageId",
                table: "Character",
                nullable: true);
            migrationBuilder.AddForeignKey(
                name: "FK_Character_Image_ProfileImageId",
                table: "Character",
                column: "ProfileImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_InventoryItem_Image_PictureId",
                table: "InventoryItem",
                column: "PictureId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Character_Image_ProfileImageId", table: "Character");
            migrationBuilder.DropForeignKey(name: "FK_InventoryItem_Image_PictureId", table: "InventoryItem");
            migrationBuilder.DropColumn(name: "PictureId", table: "InventoryItem");
            migrationBuilder.DropColumn(name: "ProfileImageId", table: "Character");
            migrationBuilder.DropTable("Image");
            migrationBuilder.CreateTable(
                name: "GalleryItem",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CharacterId = table.Column<Guid>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Image = table.Column<byte[]>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GalleryItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GalleryItem_Character_CharacterId",
                        column: x => x.CharacterId,
                        principalTable: "Character",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });
            migrationBuilder.AlterColumn<Guid>(
                name: "CharacterId",
                table: "InventoryItem",
                nullable: false);
            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "InventoryItem",
                nullable: true);
            migrationBuilder.AddColumn<byte[]>(
                name: "ProfileImage",
                table: "Character",
                nullable: true);
        }
    }
}
