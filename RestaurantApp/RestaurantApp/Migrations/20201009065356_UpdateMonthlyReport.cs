using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.Migrations
{
    public partial class UpdateMonthlyReport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NetProfit",
                table: "MonthlyReports");

            migrationBuilder.DropColumn(
                name: "TotalCost",
                table: "MonthlyReports");

            migrationBuilder.DropColumn(
                name: "TotalIncome",
                table: "MonthlyReports");

            migrationBuilder.AddColumn<double>(
                name: "Cost",
                table: "MonthlyReports",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Profit",
                table: "MonthlyReports",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalPrice",
                table: "MonthlyReports",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cost",
                table: "MonthlyReports");

            migrationBuilder.DropColumn(
                name: "Profit",
                table: "MonthlyReports");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "MonthlyReports");

            migrationBuilder.AddColumn<double>(
                name: "NetProfit",
                table: "MonthlyReports",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalCost",
                table: "MonthlyReports",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalIncome",
                table: "MonthlyReports",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
