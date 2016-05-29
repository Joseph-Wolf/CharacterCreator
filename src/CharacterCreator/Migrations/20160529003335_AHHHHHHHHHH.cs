using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace CharacterCreator.Migrations
{
    public partial class AHHHHHHHHHH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Image_Character_ForeignId", table: "Image");
            migrationBuilder.AddColumn<Guid>(
                name: "CharacterId",
                table: "Image",
                nullable: true);
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
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Image_Character_CharacterId", table: "Image");
            migrationBuilder.DropForeignKey(name: "FK_Image_InventoryItem_ForeignId", table: "Image");
            migrationBuilder.DropColumn(name: "CharacterId", table: "Image");
            migrationBuilder.AddForeignKey(
                name: "FK_Image_Character_ForeignId",
                table: "Image",
                column: "ForeignId",
                principalTable: "Character",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
