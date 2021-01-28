namespace AdminReservationApp.Migrations
{
    using AdminReservationApp.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AdminReservationApp.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AdminReservationApp.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            context.Categories.AddOrUpdate(x => x.Id,

                    new Category() { Id = 1, Name = "Gel-lak (U boji)", Price = 1200M },
                    new Category() { Id = 2, Name = "Gel-lak (French)", Price = 1300M },
                    new Category() { Id = 3, Name = "Gel (U boji)", Price = 1200M },
                    new Category() { Id = 4, Name = "Gel (French)", Price = 1300M },
                    new Category() { Id = 5, Name = "Izlivanje", Price = 1500M },
                    new Category() { Id = 6, Name = "Izlivanje (French)", Price = 1700M },
                    new Category() { Id = 7, Name = "Skidanje (Gel-lak)", Price = 500M }
                );
            context.SaveChanges();

            context.Reservations.AddOrUpdate(x => x.Id,

                    new Reservation() { Id = 1, Client = "Irena Jovanovic", CategoryId = 1, Date = DateTime.Parse("01/15/2021 10:00 AM"), Contact = "060/23 31 555" },
                    new Reservation() { Id = 2, Client = "Ivana Milenovic", CategoryId = 2, Date = DateTime.Parse("01/15/2021 11:30 AM"), Contact = "061/59 38 021" },
                    new Reservation() { Id = 3, Client = "Lena Ivanovic", CategoryId = 1, Date = DateTime.Parse("01/16/2021 08:00 AM"), Contact = "062/15 13 894" },
                    new Reservation() { Id = 4, Client = "Jovana Marinkovic", CategoryId = 1, Date = DateTime.Parse("01/16/2021 09:30 AM"), Contact = "065/15 54 555" },
                    new Reservation() { Id = 5, Client = "Kristina Jovic", CategoryId = 2, Date = DateTime.Parse("01/16/2021 11:00 AM"), Contact = "069/23 73 609" },
                    new Reservation() { Id = 6, Client = "Nikolina Milovanovic", CategoryId = 4, Date = DateTime.Parse("01/17/2021 09:30 AM"), Contact = "069/67 13 409" },
                    new Reservation() { Id = 7, Client = "Marina Djuric", CategoryId = 5, Date = DateTime.Parse("01/17/2021 10:30 AM"), Contact = "063/13 31 899" },
                    new Reservation() { Id = 8, Client = "Gordana Tasevski", CategoryId = 3, Date = DateTime.Parse("01/18/2021 10:30 AM"), Contact = "064/55 43 109" },
                    new Reservation() { Id = 9, Client = "Maja Markovic", CategoryId = 6, Date = DateTime.Parse("01/18/2021 11:30 AM"), Contact = "061/24 67 597" },
                    new Reservation() { Id = 10, Client = "Slavica Stevanovic", CategoryId = 1, Date = DateTime.Parse("01/21/2021 08:30 AM"), Contact = "063/81 57 879" },
                    new Reservation() { Id = 11, Client = "Tanja Zivic", CategoryId = 2, Date = DateTime.Parse("01/21/2021 10:30 AM"), Contact = "060/72 07 325" },
                    new Reservation() { Id = 12, Client = "Aleksandra Pejic", CategoryId = 1, Date = DateTime.Parse("01/21/2021 11:00 AM"), Contact = "062/23 78 329" },
                    new Reservation() { Id = 13, Client = "Natasa Marinkovic", CategoryId = 5, Date = DateTime.Parse("01/25/2021 08:00 AM"), Contact = "062/23 90 301" },
                    new Reservation() { Id = 14, Client = "Milena Subotic", CategoryId = 4, Date = DateTime.Parse("01/25/2021 09:30 AM"), Contact = "063/95 16 904" },
                    new Reservation() { Id = 15, Client = "Sara Tadic", CategoryId = 7, Date = DateTime.Parse("01/25/2021 10:30 AM"), Contact = "061/22 95 609" },
                    new Reservation() { Id = 16, Client = "Ana Veselinovic", CategoryId = 3, Date = DateTime.Parse("01/25/2021 11:45 AM"), Contact = "060/23 02 889" },
                    new Reservation() { Id = 17, Client = "Marina Filipovic", CategoryId = 6, Date = DateTime.Parse("01/28/2021 08:30 AM"), Contact = "063/23 13 609" },
                    new Reservation() { Id = 18, Client = "Nevena Grujic", CategoryId = 2, Date = DateTime.Parse("02/28/2021 10:30 AM"), Contact = "066/23 13 609" },
                    new Reservation() { Id = 19, Client = "Dragana Vulovic", CategoryId = 1, Date = DateTime.Parse("01/28/2021 11:45 AM"), Contact = "064/23 64 609" },
                    new Reservation() { Id = 20, Client = "Senka Maricic", CategoryId = 5, Date = DateTime.Parse("01/30/2021 08:00 AM"), Contact = "065/23 99 609" },
                    new Reservation() { Id = 21, Client = "Lena Micic", CategoryId = 4, Date = DateTime.Parse("01/30/2021 09:30 AM"), Contact = "069/23 77 609" }
                );
            context.SaveChanges();
        }
    }
}
