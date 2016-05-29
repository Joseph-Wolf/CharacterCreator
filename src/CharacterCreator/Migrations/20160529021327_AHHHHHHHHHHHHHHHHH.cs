using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace CharacterCreator.Migrations
{
    public partial class AHHHHHHHHHHHHHHHHH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Image_InventoryItem_ForeignId", table: "Image");
            migrationBuilder.DropForeignKey(name: "FK_InventoryItem_Character_CharacterId", table: "InventoryItem");
            migrationBuilder.AddForeignKey(
                name: "FK_Image_InventoryItem_ForeignId",
                table: "Image",
                column: "ForeignId",
                principalTable: "InventoryItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_InventoryItem_Character_CharacterId",
                table: "InventoryItem",
                column: "CharacterId",
                principalTable: "Character",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_Image_InventoryItem_ForeignId", table: "Image");
            migrationBuilder.DropForeignKey(name: "FK_InventoryItem_Character_CharacterId", table: "InventoryItem");
            migrationBuilder.AddForeignKey(
                name: "FK_Image_InventoryItem_ForeignId",
                table: "Image",
                column: "ForeignId",
                principalTable: "InventoryItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_InventoryItem_Character_CharacterId",
                table: "InventoryItem",
                column: "CharacterId",
                principalTable: "Character",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
