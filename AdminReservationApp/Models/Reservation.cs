using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AdminReservationApp.Models
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Client { get; set; }

        [DisplayFormat(DataFormatString = "{0:dddd, dd MMMM yyyy}")]
        public DateTime Date { get; set; }

        [MaxLength(30)]
        public string Contact { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
    }
}