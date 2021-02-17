using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.Migrations
{
    public partial class RestaurantDetailsAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RestaurantDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    OpeningHour = table.Column<int>(nullable: false),
                    ClosingHour = table.Column<int>(nullable: false),
                    Details = table.Column<string>(nullable: true),
                    AddressId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestaurantDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RestaurantDetails_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantDetails_AddressId",
                table: "RestaurantDetails",
                column: "AddressId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RestaurantDetails");
        }
    }
}
