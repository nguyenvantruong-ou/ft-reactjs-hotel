using Hotel.Domain.Rooms.Entities;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Statistics
{
    public interface IStatisticalRoomRepository 
    {
        Task<Decimal> GetRevenueRoomAsync(int month, int year);
    }
}
