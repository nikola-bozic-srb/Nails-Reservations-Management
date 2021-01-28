using AdminReservationApp.Interfaces;
using AdminReservationApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace AdminReservationApp.Repository
{
    public class CategoryRepository : ICategory, IDisposable
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

        public void Add(Category category)
        {
            db.Categories.Add(category);
            db.SaveChanges();
        }

        public void Delete(Category category)
        {
            db.Categories.Remove(category);
            db.SaveChanges();
        }

        public IEnumerable<Category> GetAll()
        {
            return db.Categories;
        }

        public Category GetById(int id)
        {
            return db.Categories.Where(x => x.Id == id).FirstOrDefault();
        }

        public void Update(Category category)
        {
            db.Entry(category).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
        }

    }
}