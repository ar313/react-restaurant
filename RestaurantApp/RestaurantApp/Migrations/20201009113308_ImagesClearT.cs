using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.Migrations
{
    public partial class ImagesClearT : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_Image_DishImageId",
                table: "Dishes");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropIndex(
                name: "IX_Dishes_DishImageId",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "DishImageId",
                table: "Dishes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DishImageId",
                table: "Dishes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageData = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    ImageTitle = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dishes_DishImageId",
                table: "Dishes",
                column: "DishImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_Image_DishImageId",
                table: "Dishes",
                column: "DishImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
