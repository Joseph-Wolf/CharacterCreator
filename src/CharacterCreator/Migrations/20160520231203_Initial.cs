using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace CharacterCreator.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Character",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    Gender = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Race = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Character", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("Character");
        }
    }
}
