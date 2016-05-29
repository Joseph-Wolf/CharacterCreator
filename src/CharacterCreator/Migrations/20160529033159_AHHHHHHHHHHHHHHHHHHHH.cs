using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace CharacterCreator.Migrations
{
    public partial class AHHHHHHHHHHHHHHHHHHHH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ImagesAsString",
                table: "InventoryItem",
                nullable: false);
            migrationBuilder.AlterColumn<string>(
                name: "GalleryAsString",
                table: "Character",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ImagesAsString",
                table: "InventoryItem",
                nullable: true);
            migrationBuilder.AlterColumn<string>(
                name: "GalleryAsString",
                table: "Character",
                nullable: true);
        }
    }
}
