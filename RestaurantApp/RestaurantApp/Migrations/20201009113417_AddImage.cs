using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.Migrations
{
    public partial class AddImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DishImageId",
                table: "Dishes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ImageTitle = table.Column<string>(nullable: true),
                    ImageData = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dishes_DishImageId",
                table: "Dishes",
                column: "DishImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_Images_DishImageId",
                table: "Dishes",
                column: "DishImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_Images_DishImageId",
                table: "Dishes");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Dishes_DishImageId",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "DishImageId",
                table: "Dishes");
        }
    }
}
