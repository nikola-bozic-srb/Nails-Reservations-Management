using AdminReservationApp.Interfaces;
using AdminReservationApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace AdminReservationApp.Controllers
{
    public class CategoriesController : ApiController
    {
        ICategory _repository { get; set; }

        public CategoriesController(ICategory repository)
        {
            _repository = repository;
        }


        public IEnumerable<Category> GetAll()
        {
            return _repository.GetAll();
        }


        [ResponseType(typeof(Category))]
        public IHttpActionResult GetById(int id)
        {
            Category category = _repository.GetById(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);

        }


        [ResponseType(typeof(Category))]
        public IHttpActionResult Post(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Add(category);

            return CreatedAtRoute("DefaultApi", new { id = category.Id }, category);

        }


        [ResponseType(typeof(Category))]
        public IHttpActionResult Put(int id, Category category)
        {
            if (category.Id != id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _repository.Update(category);
            }
            catch
            {

                return BadRequest();
            }

            return Ok(category);
        }


        [ResponseType(typeof(Category))]
        public IHttpActionResult Delete(int id)
        {
            Category category = _repository.GetById(id);

            if (category == null)
            {
                return NotFound();
            }

            _repository.Delete(category);

            return Ok();
        }
    }
}
