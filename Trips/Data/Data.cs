using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Trips.Data.Models;

namespace Trips.Data
{
    public static class Data
    {
        public static List<Trip> Trips => allTrips;
        static List<Trip> allTrips = new List<Trip>()
        {
            new Trip()
            {
                Id = 1,
                Name = "London, England",
                Description = "London Trip Description.",
                DateStarted = new DateTime(2019, 02, 01),
                DateCompleted = null
            },
            new Trip()
            {
                Id = 2,
                Name = "Beijing, China",
                Description = "Beijing Trip Description.",
                DateStarted = new DateTime(2018, 02, 01),
                DateCompleted = new DateTime(2018, 03, 02)
            },
        };
    }
}