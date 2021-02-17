using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.Migrations
{
    public partial class ImagesClear : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_Images_DishImageId",
                table: "Dishes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "Image");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Image",
                table: "Image",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_Image_DishImageId",
                table: "Dishes",
                column: "DishImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_Image_DishImageId",
                table: "Dishes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Image",
                table: "Image");

            migrationBuilder.RenameTable(
                name: "Image",
                newName: "Images");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_Images_DishImageId",
                table: "Dishes",
                column: "DishImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
