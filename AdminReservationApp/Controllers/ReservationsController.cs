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
    [Authorize]
    public class ReservationsController : ApiController
    {

        IReservation _repository { get; set; }

        public ReservationsController(IReservation repository)
        {
            _repository = repository;
        }

        [AllowAnonymous]
        public IEnumerable<Reservation> GetAll()
        {
            return _repository.GetAll();
        }


        [ResponseType(typeof(Reservation))]
        public IHttpActionResult GetById(int id)
        {
            Reservation reservation = _repository.GetById(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }


        [ResponseType(typeof(Reservation))]
        public IHttpActionResult Post(Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Add(reservation);

            return CreatedAtRoute("DefaultApi", new { id = reservation.Id }, reservation);
        }


        [ResponseType(typeof(Reservation))]
        public IHttpActionResult Put(int id, Reservation reservation)
        {
            if (reservation.Id != id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _repository.Update(reservation);
            }
            catch
            {

                return BadRequest();
            }

            return Ok(reservation);
        }


        [ResponseType(typeof(Reservation))]
        public IHttpActionResult Delete(int id)
        {
            Reservation reservation = _repository.GetById(id);

            if (reservation == null)
            {
                return NotFound();
            }

            _repository.Delete(reservation);

            return Ok();
        }

        [AllowAnonymous]
        [Route("api/statistics")]
        public IEnumerable<CategoryStatisticsDTO> GetCategoryStatistics()
        {

            return _repository.CategoryStatistics();
        }

        [AllowAnonymous]
        [Route("api/WeekStatistics")]
        public IEnumerable<WeekStatisticsDTO> GetWeekStatistics()
        {

            return _repository.WeekStatistics();
        }

    }
}
