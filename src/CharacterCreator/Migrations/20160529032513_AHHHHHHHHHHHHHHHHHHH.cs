using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace CharacterCreator.Migrations
{
    public partial class AHHHHHHHHHHHHHHHHHHH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Character_Image_ProfileImageId", table: "Character");
            migrationBuilder.DropForeignKey(name: "FK_Image_Character_CharacterId", table: "Image");
            migrationBuilder.DropForeignKey(name: "FK_Image_InventoryItem_ForeignId", table: "Image");
            migrationBuilder.DropForeignKey(name: "FK_InventoryItem_Image_PictureId", table: "InventoryItem");
            migrationBuilder.DropColumn(name: "PictureId", table: "InventoryItem");
            migrationBuilder.DropColumn(name: "CharacterId", table: "Image");
            migrationBuilder.DropColumn(name: "ProfileImageId", table: "Character");
            migrationBuilder.AddColumn<Guid>(
                name: "Image",
                table: "InventoryItem",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
            migrationBuilder.AddColumn<string>(
                name: "ImagesAsString",
                table: "InventoryItem",
                nullable: true);
            migrationBuilder.AddColumn<string>(
                name: "GalleryAsString",
                table: "Character",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "ProfileImage",
                table: "Character",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "Image", table: "InventoryItem");
            migrationBuilder.DropColumn(name: "ImagesAsString", table: "InventoryItem");
            migrationBuilder.DropColumn(name: "GalleryAsString", table: "Character");
            migrationBuilder.DropColumn(name: "ProfileImage", table: "Character");
            migrationBuilder.AddColumn<Guid>(
                name: "PictureId",
                table: "InventoryItem",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
                name: "CharacterId",
                table: "Image",
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
                name: "FK_Image_Character_CharacterId",
                table: "Image",
                column: "CharacterId",
                principalTable: "Character",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Image_InventoryItem_ForeignId",
                table: "Image",
                column: "ForeignId",
                principalTable: "InventoryItem",
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
    }
}
