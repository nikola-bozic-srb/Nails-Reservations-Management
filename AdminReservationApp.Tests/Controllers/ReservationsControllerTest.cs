using AdminReservationApp.Controllers;
using AdminReservationApp.Interfaces;
using AdminReservationApp.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace AdminReservationApp.Tests.Controllers
{
    [TestClass]
    public class ReservationsControllerTest
    {

        [TestMethod]
        public void GetReturnsProductWithSameId()
        {
            // Arrange
            var mockRepository = new Mock<IReservation>();
            mockRepository.Setup(x => x.GetById(42)).Returns(new Reservation { Id = 42 });

            var controller = new ReservationsController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.GetById(42);
            var contentResult = actionResult as OkNegotiatedContentResult<Reservation>;

            // Assert
            Assert.IsNotNull(contentResult);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual(42, contentResult.Content.Id);
        }

        [TestMethod]
        public void GetReturnsNotFound()
        {
            // Arrange
            var mockRepository = new Mock<IReservation>();
            var controller = new ReservationsController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.GetById(10);

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void DeleteReturnsNotFound()
        {
            // Arrange 
            var mockRepository = new Mock<IReservation>();
            var controller = new ReservationsController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.Delete(10);

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void PostMethodSetsLocationHeader()
        {
            // Arrange
            var mockRepository = new Mock<IReservation>();
            var controller = new ReservationsController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.Post(new Reservation { Id = 10, Client = "Client 1" });
            var createdResult = actionResult as CreatedAtRouteNegotiatedContentResult<Reservation>;

            // Assert
            Assert.IsNotNull(createdResult);
            Assert.AreEqual("DefaultApi", createdResult.RouteName);
            Assert.AreEqual(10, createdResult.RouteValues["id"]);
        }
    }
}
