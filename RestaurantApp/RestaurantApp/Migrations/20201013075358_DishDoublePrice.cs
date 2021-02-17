using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.Migrations
{
    public partial class DishDoublePrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "DishPrice",
                table: "Dishes",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "DishPrice",
                table: "Dishes",
                type: "real",
                nullable: false,
                oldClrType: typeof(double));
        }
    }
}
