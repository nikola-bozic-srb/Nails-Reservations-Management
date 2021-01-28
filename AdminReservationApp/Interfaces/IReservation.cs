using AdminReservationApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminReservationApp.Interfaces
{
    public interface IReservation
    {
        IEnumerable<Reservation> GetAll();
        Reservation GetById(int id);
        void Add(Reservation reservation);
        void Update(Reservation reservation);
        void Delete(Reservation reservation);

        IEnumerable<CategoryStatisticsDTO> CategoryStatistics();
        IEnumerable<WeekStatisticsDTO> WeekStatistics();
    }
}
