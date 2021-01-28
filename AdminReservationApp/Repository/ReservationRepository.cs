using AdminReservationApp.Interfaces;
using AdminReservationApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Core.Objects;

namespace AdminReservationApp.Repository
{
    public class ReservationRepository : IReservation, IDisposable
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Add(Reservation reservation)
        {
            db.Reservations.Add(reservation);
            db.SaveChanges();
        }

        public void Delete(Reservation reservation)
        {
            db.Reservations.Remove(reservation);
            db.SaveChanges();
        }

        public IEnumerable<Reservation> GetAll()
        {
            return db.Reservations.Include(x => x.Category).OrderBy(x => x.Date);
        }

        public Reservation GetById(int id)
        {
            return db.Reservations.Include(x => x.Category).Where(x => x.Id == id).FirstOrDefault();
        }

        public void Update(Reservation reservation)
        {
            db.Entry(reservation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
        }

        public IEnumerable<CategoryStatisticsDTO> CategoryStatistics()
        {
            return db.Reservations.Include(x => x.Category).GroupBy(
                x => x.Category,
                x => x.Category.Price,
                (category, price) =>
                new CategoryStatisticsDTO() { Name = category.Name, Price = price.Sum() }
                ).OrderBy(x => x.Price);
        }

        [Obsolete]
        public IEnumerable<WeekStatisticsDTO> WeekStatistics()
        {
            return db.Reservations.Include(x => x.Category).GroupBy(
                  x => EntityFunctions.TruncateTime(x.Date),
                  x => x.Category.Price,
                  (date, price) =>
                  new WeekStatisticsDTO() { Date = date.ToString(), Price = price.Sum() }
                ).OrderBy(x => x.Date).Take(14);
        }
    }
}