using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace CharacterCreator.Migrations
{
    public partial class AHHHHHHHHHHHHHHHHHH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Image_InventoryItem_ForeignId", table: "Image");
            migrationBuilder.AlterColumn<Guid>(
                name: "CharacterId",
                table: "InventoryItem",
                nullable: true);
            migrationBuilder.AddForeignKey(
                name: "FK_Image_InventoryItem_ForeignId",
                table: "Image",
                column: "ForeignId",
                principalTable: "InventoryItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Image_InventoryItem_ForeignId", table: "Image");
            migrationBuilder.AlterColumn<Guid>(
                name: "CharacterId",
                table: "InventoryItem",
                nullable: false);
            migrationBuilder.AddForeignKey(
                name: "FK_Image_InventoryItem_ForeignId",
                table: "Image",
                column: "ForeignId",
                principalTable: "InventoryItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
