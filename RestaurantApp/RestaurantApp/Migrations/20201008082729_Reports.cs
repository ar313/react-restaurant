using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.Migrations
{
    public partial class Reports : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DailyReports",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TotalPrice = table.Column<double>(nullable: false),
                    Profit = table.Column<double>(nullable: false),
                    Cost = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyReports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MonthlyReports",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TotalCost = table.Column<double>(nullable: false),
                    TotalIncome = table.Column<double>(nullable: false),
                    NetProfit = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonthlyReports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CostReports",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Cost = table.Column<double>(nullable: false),
                    DailyReportId = table.Column<Guid>(nullable: true),
                    MonthlyReportId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CostReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CostReports_DailyReports_DailyReportId",
                        column: x => x.DailyReportId,
                        principalTable: "DailyReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CostReports_MonthlyReports_MonthlyReportId",
                        column: x => x.MonthlyReportId,
                        principalTable: "MonthlyReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CostReports_DailyReportId",
                table: "CostReports",
                column: "DailyReportId");

            migrationBuilder.CreateIndex(
                name: "IX_CostReports_MonthlyReportId",
                table: "CostReports",
                column: "MonthlyReportId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CostReports");

            migrationBuilder.DropTable(
                name: "DailyReports");

            migrationBuilder.DropTable(
                name: "MonthlyReports");
        }
    }
}
