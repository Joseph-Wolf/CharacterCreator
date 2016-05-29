using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace CharacterCreator.Migrations
{
    public partial class AHHHHHHHHHHHHHHHHHHHHH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "ForeignId", table: "Image");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ForeignId",
                table: "Image",
                nullable: true);
        }
    }
}
